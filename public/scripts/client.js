//TODO: clean up init
//TODO: add the rest of the recipes to the database
//TODO: clarify the function names or order of calls on user form submit
//TODO: validate/fix what happens if user needs more recipes than exist in database
//TODO:   Add ability to add recipe from DOM using: getMeasurements(), getIngredients();, getRecipeIngredients(number);

$(document).ready(function() {
  init();
}); // end doc ready

var init = function() {
  console.log('in init');
  //add focus to the form on load
  $("#numMealsIn").focus();
  //Get and create section div's for list display
  getSections();
  //Event Listeners
  $('#displayRecipesButton').on('click', getRecipes);
}; // end init

var addPlurality = function(ingredient) {
  //console.log('in addPlurality');
  //If the ingredient amount > 1, add an 's' if/where appropriate
  if (ingredient.amount > 1) {
    //Make the measurement plural with 's'
    if (ingredient.measurement != 'Oz' &&
        ingredient.measurement != 'Tbsp' &&
        ingredient.measurement != 'Tsp' &&
        ingredient.measurement != 'Box' &&
        ingredient.measurement != 'Inch' &&
        ingredient.measurement != 'Large Leaves') {
      ingredient.measurement += 's';
    } // end if
    //Make the measurement plural with 'es' if/where appropriate
    if (ingredient.measurement === 'Inch' ||
        ingredient.measurement === 'Box') {
      ingredient.measurement += 'es';
    } // end if
  } // end if
  return ingredient.measurement;
}; // end addPlurality

var appendIngredientsToListSections = function(ingredientsArray) {
  console.log('in appendIngredientsToListSections');
  //append the ingredient to the appropriate section list
  for (var i = 0; i < ingredientsArray.length; i++) {
    var $sectionList = $('#'+ingredientsArray[i].section+'Ingredients');
    var amount = ingredientsArray[i].amount;
    var ingredient = ingredientsArray[i].ingredient;
    var measurement = ingredientsArray[i].measurement;
    $sectionList.append('<li>' + amount + ' ' + measurement + ' ' + ingredient +'</li>');
  } // end for
}; // end appendIngredientsToListSections

var buildUrlParams = function(numbersArray) {
  console.log('in buildUrlParams');
  //set counter variable and params object
  var params = {};
  var count = 1;
  //loop through array and add parameter for each number
  for (var i = 0; i < numbersArray.length; i++) {
    params['id'+count] = numbersArray[i];
    count++;
  } // end for
  //add number of numbers in array to params
  params.totalNum = numbersArray.length;
  //return the param object
  return params;
}; // end buildUrlParams

var clearItemMeasurement = function(ingredientObject) {
  //console.log('in clearItemMeasurement');
  if (ingredientObject.measurement === 'Item' || ingredientObject.measurement === 'Items') {
    ingredientObject.measurement = '';
  } // end if
}; // end deleteItemMeasurement

var condenseIngredientObjects = function(ingredientArray) {
  console.log('in condenseIngredientObjects');
  var output = [];
  //For each ingredient object in ingredientArray
  ingredientArray.forEach(function(ingredient) {
      //Filter through ingredient objects to find other ingredients with the same name and measurement
      //Store any matches in matches array
      var matches = output.filter(function(v, i) {
          return v.ingredient == ingredient.ingredient && v.measurement == ingredient.measurement;
      }); // end matches
      //If matches array contains any matches
      if(matches.length) {
          //find the index of the match in ingredientArray
          var matchIndex = output.indexOf(matches[0]);
          //consolidate the matches by adding the amounts together
          output[matchIndex].amount = output[matchIndex].amount+ingredient.amount;
      } // end if
      else {
        //If no matches exist, push the ingredient into output array
          output.push(ingredient);
      } // end else
  }); // end forEach
  return output;
}; // end condenseRecipeObjects

var convertToFraction = function(number) {
  var fraction = new Fraction(number);
  return fraction.toFraction(true);
}; // end convertToFraction

var displayList =  function(e) {
  console.log('in displayList');
  //prevent page refresh on form submit
  e.preventDefault();
  //hide the form, show the list
  $('.hideable').hide();
  $('.results').show();
  // get total number of recipes in database
  getTotalRecipeCount(); //getManyRecipeIngredients as a callback
}; // end displayList

var displayRecipeNames = function(array) {
  console.log('in displayRecipeNames', array);
  for (var i = 0; i < array.length; i++) {
    $('#mealsDiv').append('<p>' + array[i].name + '</p>');
  } // end for
}; // end displayRecipeNames

var displayRecipes = function(recipeArray) {
  console.log('in displayRecipes', recipeArray);
  toggleRecipeVisibility();
  var $recipeDiv = $('#recipeDisplayDiv');
  //clear html
  $recipeDiv.html('');
  //for each recipe in the array, append a div displaying its information
  for (var i = 0; i < recipeArray.length; i++) {
    var recipe = recipeArray[i];
    $recipeDiv.append('<div class="col-sm-3"></div>');
    var $wrapper = $recipeDiv.children().last().append('<div class="recipe"></div>');
    var $recipe = $wrapper.children().last();
    //recipe title div
    $recipe.append('<div class="recipe-title"><p>' + recipe.name + '</p></div>');
    //if the recipe link exists, add a link next to the title
    if (recipe.reference_url !== null) {
      //Append an info glyphicon link to the title element
      var $recipeTitle = $recipe.children().last().find('p');
      $recipeTitle.append('<a href="'+ recipe.reference_url +'" target="_blank" class="recipe-link"></a>');
      var $recipeLink = $recipeTitle.children().last();
      $recipeLink.append('<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>');
    } //end if
    //Add background image via CSS
    $recipe.css('background-image', 'url('+recipe.image_url+')');
  } // end for
}; // end displayRecipes

var formatIngredientObjects = function(ingredientsArray) {
  console.log('in formatIngredientObjects');
  //TODO: Break extract this into 3 separate functions (plurality, fraction, measurement)
  for (var i = 0; i < ingredientsArray.length; i++) {
    var ingredient = ingredientsArray[i];
    //Add plurality on measurements where appropriate, depending on amount
    ingredient.measurement = addPlurality(ingredient);
    //If the measurement is 'Item', clear it
    clearItemMeasurement(ingredient);
    //Convert amount number to a fraction (using fraction.min.js plugin)
    ingredient.amount = convertToFraction(ingredient.amount);
  } // end for
  //Return the formatted ingredientsArray
  return ingredientsArray;
}; // end formatIngredientObjects

var generateSectionElements = function(sectionsArray) {
  console.log('in generateSectionElements');
  for (var i = 0; i < sectionsArray.length; i++) {
    //append a div for each section
    $('#sectionsDiv').append('<div class="col-sm-3"></div>');
    var $section = $('#sectionsDiv').children().last();
    //to that div, append a header and a list- the list with an id of *Section*Ingredients
    $section.append('<h4>' + sectionsArray[i].section + '</h4>');
    $section.append('<ul id="' + sectionsArray[i].section + 'Ingredients" class="text-center"></ul>');
  } // end for
}; // end generateSectionDivs

var getSections = function(){
  console.log('in getSections');
  $.ajax({
    type: 'GET',
    url: '/section',
    success: function(response) {
      generateSectionElements(response.sections);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getSections

var getIngredients = function() {
  console.log('in getIngredients');
  $.ajax({
    type: 'GET',
    url: '/ingredient',
    success: function(response){
      console.log(response);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getIngredients

var getManyRecipeIngredients = function(arrayOfNumbers) {
  console.log('in getManyRecipeIngredients for:', arrayOfNumbers);
  var params = buildUrlParams(arrayOfNumbers);
  //build url string
  var urlString = '/joined/list?'+ $.param(params);
  $.ajax({
    type: 'GET',
    url: urlString,
    success: function(response) {
      //Condense grocery list if an ingredient item and measurement are the same
      //Format ingredients to clear 'Item', convert numbers to fractions, and add plurality
      var formattedIngredients = formatIngredientObjects(condenseIngredientObjects(response.ingredientList));
      appendIngredientsToListSections(formattedIngredients);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getManyRecipeIngredients

var getMealNames = function(array) {
  console.log('in getMealNames', array);
  var params = buildUrlParams(array);
  var urlString = '/recipe/name?' + $.param(params);
  $.ajax({
    type: 'GET',
    url: urlString,
    success: function(response) {
      //display recipe names on the DOM
      displayRecipeNames(response.names);
    }, // end success
    error: function(err){
      console.log(err);
    } // end error
  }); // end ajax
}; // end getMealNames

var getMeasurements = function() {
  console.log('in getMeasurements');
  $.ajax({
    type: 'GET',
    url: '/measurement',
    success: function(response) {
      console.log(response);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getMeasurements

var getRandomInt = function(maxNum) {
  console.log('in getRandomInt');
  //set min value to 1
  min = Math.ceil(1);
  //set max value the total number of recipes in database
  max = Math.floor(maxNum+1);
  //choose a random number
  num = Math.floor(Math.random()*(max-min))+min;
  return num;
}; //end getRandomInt

var getRecipeIngredients = function(recipeId) {
  console.log('in getRecipeIngredients');
  var url = '/joined?id=' + recipeId;
  $.ajax({
    type: 'GET',
    url: url,
    success: function(response) {
      console.log(response);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getRecipeIngredients

var getRecipes = function(recipeNumber) {
  console.log('in getRecipes');
  $.ajax({
    type: 'GET',
    url: '/recipe',
    success: function(response) {
      console.log(response);
      displayRecipes(response.recipes);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getRecipe

var getTotalRecipeCount = function() {
  console.log('in getTotalRecipeCount');
  $.ajax({
    type: 'GET',
    url: '/recipe/count',
    success: function(response) {
      var recipeCount = Number(response.count);
      //get user input for number of meals requested
      var numMeals = $('#numMealsIn').val();
      //make recipe id array
      var IdArray = makeRecipeIdArray(numMeals, recipeCount);
      //get ingredients and names for meals
      getManyRecipeIngredients(IdArray);
      getMealNames(IdArray);
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getTotalRecipeCount

var makeRecipeIdArray = function(amount, maxNum){
  console.log('in makeRecipeIdArray');
  numbers = [];
  //choose a random number for each number of meals requested by user
  while (numbers.length < amount){
    num = getRandomInt(maxNum);
    if ($.inArray(num, numbers) === -1) {
      //push random number into numbers array
      numbers.push(num);
    } // end if
  } // end while
  //console.log('chosen numbers:', numbers);
  return numbers;
}; //end makeRecipeIdArray

var toggleRecipeVisibility = function() {
  console.log('in toggleRecipeVisibility');
  //toggle visibility of resipes on button click
  $('.recipe-display').fadeToggle('fast');
  console.log($('#displayRecipesButton').text());
  if ($('#displayRecipesButton').text() === 'View All Recipes') {
    $('#displayRecipesButton').text('Hide Recipes');
  } else {
    $('#displayRecipesButton').text('View All Recipes');
  } // end else
}; // end toggleRecipeVisibility
