//TODO: clean up init
//TODO: add the rest of the recipes to the database
//TODO: clarify the function names or order of calls on user form submit
//TODO: condense ingredient objecs before displaying them on list
//TODO: get and display meal names for the user with ingredients

$(document).ready(function() {
  init();
}); // end doc ready

var init = function() {
  console.log('in init');
  //add focus to the form on load
  $("#numMealsIn").focus();
  //TODO: move these function calls later
  getRecipeIngredients(1);
  //get ingredients and measurements
  getIngredients();
  getMeasurements();
  //TODO: keep the following
  getSections();
  //Event Listeners
  $('#displayRecipesButton').on('click', getRecipes);
}; // end init

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

var condenseIngredientObjects = function(ingredientArray) {
  console.log('in condenseIngredientObjects');
  //Condense grocery list if an ingredient item and measurement are the same
  //TODO: add better comments to this function for clarity
  var output = [];
  ingredientArray.forEach(function(value) {
      var existing = output.filter(function(v, i) {
          return v.ingredient == value.ingredient && v.measurement == value.measurement;
      }); // end existing
      if(existing.length) {
          var existingIndex = output.indexOf(existing[0]);
          output[existingIndex].amount = output[existingIndex].amount+value.amount;
      } // end if
      else {
          if(typeof value.amount == 'number')
              value.amount = value.amount;
          output.push(value);
      } // end else
  }); // end forEach
  return output;
}; // end condenseRecipeObjects

var displayList =  function(e) {
  console.log('in displayList');
  //prevent page refresh on form submit
  e.preventDefault();
  //hide the form, show the list
  $('.hideable').hide();
  $('.results').show();
  // get total number of recipes in database, getManyRecipeIngredients as a callback
  getTotalRecipeCount();
}; // end displayList

var displayRecipes = function(recipeArray) {
  console.log('in displayRecipes', recipeArray);
  toggleRecipeVisibility();
  var $recipeDiv = $('#recipeDisplayDiv');
  //clear html
  $recipeDiv.html('');
  //for each recipe in the array, append a div displaying its information
  for (var i = 0; i < recipeArray.length; i++) {
    $recipeDiv.append('<div class="col-sm-3"></div>');
    var $wrapper = $recipeDiv.children().last().append('<div class="recipe"></div>');
    var $recipe = $wrapper.children().last();
    //recipe title div
    $recipe.append('<div class="recipe-title"><p>' + recipeArray[i].name + '</p></div>');
    //if the recipe link exists, add a link next to the title
    if (recipeArray[i].reference_url !== null) {
      //add a link with info glyphicon
      //TODO: make this more readable
      $recipe.children().last().find('p').append('<a href="'+ recipeArray[i].reference_url +'" target="_blank" class="recipe-link"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></a>');
    } //end if
    //add css for the background image
    $recipe.css('background-image', 'url('+recipeArray[i].image_url+')');
  } // end for
}; // end displayRecipes

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
      console.log(response);
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
      console.log(response);
      appendIngredientsToListSections(condenseIngredientObjects(response.ingredientList));
    }, // end success
    error: function(err) {
      console.log(err);
    } // end error
  }); // end ajax
}; // end getManyRecipeIngredients

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
      console.log('recipe count:',recipeCount);
      //get user input for number of meals requested
      var numMeals = $('#numMealsIn').val();
      //get ingredients for meals
      getManyRecipeIngredients(makeRecipeIdArray(numMeals, recipeCount));
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
