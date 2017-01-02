//TODO: add ability to remove .recipe-form-line
//TODO: add ability to view ingredient recipes one at a time: using getRecipeIngredients(number);
//TODO: add ability to add/delete recipes from list
//TODO: add ability to choose recipes for list
//TODO: give better class names to elements so its easier to hide/show things appropriately, then clean up those functions

var logs = false;

$(document).ready(function() {
  init();
}); // end doc ready

var init = function() {
  if (logs) console.log('in init');
  //Add focus to main input element
  $("#numMealsIn").focus();
  //Get sections from db
  getSections(); // callback creates Divs for list
  //Event Listeners
  $('#addMoreIngredients').on('click', addIngredientSubForm);
  $('#createRecipeButton').on('click', toggleCreateRecipeForm);
  $('#displayRecipesButton').on('click', getRecipes);
  $(document).on('click', '.modal-confirm-close-btn', reset);
  $('#resetButton').on('click', reset);
}; // end init

var addIngredientSubForm = function() {
  if (logs) console.log('in addIngredientSubForm');
  //clone the ingredient form line
  var $clone = $(this).prev().clone();
  //clear the input of cloned form
  $clone.first().find('input').val('');
  //append the clone after the existing form line
  $(this).before($clone);
  //add focus to the newly added form input
  $(this).prev().children().first().find('input').focus();
}; // end addIngredientSubForm

var addNewRecipe = function(e) {
  if (logs) console.log('in addNewRecipe');
  //Prevent page refresh on form submit
  e.preventDefault();
  //create object
  var objectToSend = {
    name: $('#recipeNameIn').val(),
    servings: $('#servingsIn').val(),
    reference_url: $('#referenceLinkIn').val(),
    image_url: $('#imageUrlIn').val()
  }; // end objectToSend
  $.ajax({
    type: 'POST',
    url: '/recipe',
    data: objectToSend,
    success: function(response) {
      //clear the form
      clearForm('createRecipeForm');
      //display add Ingredients form
      displayAddIngredientsForm(response);
    }, // end success
    error: function(err) {
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end addNewRecipe

var addRecipeIngredients = function(e) {
  if (logs) console.log('in addRecipeIngredients');
  //Prevent page refresh
  e.preventDefault();
  //make array of ingredients to add
  var ingredientsToAdd = makeRecipeIngredientArray();
  //get new recipe id
  var recipeId = $('#addIngredientsDiv').data('id');
  //make object to send
  var objectToSend = {
    id: recipeId,
    ingredients: ingredientsToAdd
  }; // end objectToSend
  if (logs) console.log(objectToSend);
  $.ajax({
    type: 'POST',
    url: '/recipe_ingredient',
    data: objectToSend,
    success: function(response) {
      if (logs) console.log(response);
      //show confirmation modal
      $('#confirmationModal').modal('show');
    }, // end success
    error: function(err) {
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end addRecipeIngredients

var addPlurality = function(ingredient) {
  //If the ingredient amount > 1
  if (ingredient.amount > 1) {
    //Make the measurement plural with 's' if/where appropriate
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
  if (logs) console.log('in appendIngredientsToListSections', ingredientsArray);
  //append the ingredient to the appropriate section div
  for (var i = 0; i < ingredientsArray.length; i++) {
    var $sectionList = $('#'+ingredientsArray[i].section+'Ingredients');
    var amount = ingredientsArray[i].amount;
    var ingredient = ingredientsArray[i].ingredient;
    var measurement = ingredientsArray[i].measurement;
    $sectionList.append('<li>' + amount + ' ' + measurement + ' ' + ingredient +'</li>');
  } // end for
  //Hide the empty list section titles
  $(".section-list:empty").prev().hide();
}; // end appendIngredientsToListSections

var buildUrlParams = function(numbersArray) {
  if (logs) console.log('in buildUrlParams');
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

var clearForm = function(formId) {
  if (logs) console.log('in clearForm');
  $('#'+formId).find('input, select').val('');
}; // end clearForm

var clearItemMeasurement = function(ingredientObject) {
  //if (logs) console.log('in clearItemMeasurement');
  if (ingredientObject.measurement === 'Item' || ingredientObject.measurement === 'Items') {
    ingredientObject.measurement = '';
  } // end if
}; // end deleteItemMeasurement

var condenseIngredientObjects = function(ingredientArray) {
  if (logs) console.log('in condenseIngredientObjects');
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

var condenseRecipeNameObjects = function(recipeNamesArray) {
  if (logs) console.log('in condenseRecipeNameObjects');
  var output = [];
  //for each object in the array
  recipeNamesArray.forEach(function(object) {
    //Find any objects in the output array that have the same name
    //Store those matches in an array
    var matches = output.filter(function(v, i) {
        return v.name == object.name;
    }); // end matches
    //If there are amy matches
    if (matches.length) {
      //find the index of the match in recipeNamesArray
      var matchIndex = output.indexOf(matches[0]);
      //increment the existing objects occurence
      output[matchIndex].occurence++;
    } else {
      //If no matches exist, push the object into the output array
      output.push(object);
    } // end else
  }); // end forEach
  if (logs) console.log('output -->', output);
  return output;
}; // end condenseRecipeNameObjects

var convertToFraction = function(number) {
  var fraction = new Fraction(number);
  return fraction.toFraction(true);
}; // end convertToFraction

var displayAddIngredientsForm = function(obj) {
  if (logs) console.log('in displayAddIngredientsForm', obj);
  //populate form selects with measurements and ingredients
  getIngredients();
  getMeasurements();
  //set data attribute for id of recipe to add ingredients to
  $('#addIngredientsDiv').data('id', obj.id);
  //hide everything else, show add ingredients form with header
  $('.hideable').hide();
  $('#recipeDisplayDiv').hide();
  $('#addIngredientsDiv').prepend('<h1 class="text-center">Add Ingredients For ' + obj.name + '</h1>');
  $('#addIngredientsDiv').fadeIn();
  $('#addIngredientsForm').fadeIn();
}; // end displayAddIngredientsForm

var displayList =  function(e) {
  if (logs) console.log('in displayList');
  //prevent page refresh on form submit
  e.preventDefault();
  //hide the form, show the list
  $('.hideable').hide();
  $('#recipeDisplayDiv').hide();
  $('#listDisplayDiv').fadeIn();
  // get total number of recipes in database
  getTotalRecipeCount(); //getManyRecipeIngredients as a callback
}; // end displayList

var displayRecipeNames = function(objectArray) {
  if (logs) console.log('in displayRecipeNames');
  //Append each meal name to the DOM
  for (var i = 0; i < objectArray.length; i++) {
    //If it occurs more than once, display how many times it occurs
    if (objectArray[i].occurence != 1) {
      if (logs) console.log('multiple:', objectArray[i].name);
      $('#mealsDiv').append('<p>(' + objectArray[i].occurence + ') ' + objectArray[i].name + '</p>');
    } else {
      //Else, just display the name
      $('#mealsDiv').append('<p>' + objectArray[i].name + '</p>');
    } // end else
  } // end for
}; // end displayRecipeNames

var displayRecipes = function(recipeArray) {
  if (logs) console.log('in displayRecipes', recipeArray);
  toggleRecipeVisibility();
  var $recipeDiv = $('#recipeDisplayDiv');
  //Empty recipeDiv
  $recipeDiv.empty();
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
  if (logs) console.log('in formatIngredientObjects');
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
  if (logs) console.log('in generateSectionElements');
  for (var i = 0; i < sectionsArray.length; i++) {
    var section = sectionsArray[i].section;
    //Pick a section column div (depending on section name)
    var $el = setSectionColumn(section);
    //To that div- append a header and a list
    $el.append('<h4 class="text-center">' + sectionsArray[i].section + '</h4>');
    //Give the list an id of *Section*Ingredients
    $el.append('<ul id="' + sectionsArray[i].section + 'Ingredients" class="text-center section-list"></ul>');
  } // end for
}; // end generateSectionDivs

var generateSelectOptions = function(selectClass, array, property1, property2) {
  if (logs) console.log('in generateSelectOptions for', selectClass);
  for (var i = 0; i < array.length; i++) {
    $(selectClass).append('<option value="'+array[i][property2]+'">'+array[i][property1]+'</option>');
  } // end for
}; // end generateSelectOptions

var getSections = function(){
  if (logs) console.log('in getSections');
  $.ajax({
    type: 'GET',
    url: '/section',
    success: function(response) {
      generateSectionElements(response.sections);
    }, // end success
    error: function(err) {
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end getSections

var getIngredients = function() {
  if (logs) console.log('in getIngredients');
  $.ajax({
    type: 'GET',
    url: '/ingredient',
    success: function(response){
      generateSelectOptions('.ingredient-in ', response.ingredients, 'name', 'id');
    }, // end success
    error: function(err) {
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end getIngredients

var getManyRecipeIngredients = function(arrayOfNumbers) {
  if (logs) console.log('in getManyRecipeIngredients for:', arrayOfNumbers);
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
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end getManyRecipeIngredients

var getMealNames = function(array) {
  if (logs) console.log('in getMealNames', array);
  var params = buildUrlParams(array);
  var urlString = '/recipe/name?' + $.param(params);
  $.ajax({
    type: 'GET',
    url: urlString,
    success: function(response) {
      //condense, then display recipe names for the chosen recipes
      var condensedRecipeNames = condenseRecipeNameObjects(makeRecipeNamesArray(response.names, array));
      if (logs) console.log('condensed recipe names -->',condensedRecipeNames);
      displayRecipeNames(condensedRecipeNames);
    }, // end success
    error: function(err){
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end getMealNames

var getMeasurements = function() {
  if (logs) console.log('in getMeasurements');
  $.ajax({
    type: 'GET',
    url: '/measurement',
    success: function(response) {
      generateSelectOptions('.measurement-in', response.measurements, 'name', 'id');
    }, // end success
    error: function(err) {
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end getMeasurements

var getRandomInt = function(maxNum) {
  if (logs) console.log('in getRandomInt');
  //set min value to 1
  min = Math.ceil(1);
  //set max value the total number of recipes in database
  max = Math.floor(maxNum+1);
  //choose a random number
  num = Math.floor(Math.random()*(max-min))+min;
  return num;
}; //end getRandomInt

var getRecipeIngredients = function(recipeId) {
  if (logs) console.log('in getRecipeIngredients');
  var url = '/joined?id=' + recipeId;
  $.ajax({
    type: 'GET',
    url: url,
    success: function(response) {
      if (logs) console.log(response);
    }, // end success
    error: function(err) {
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end getRecipeIngredients

var getRecipes = function(recipeNumber) {
  if (logs) console.log('in getRecipes');
  $.ajax({
    type: 'GET',
    url: '/recipe',
    success: function(response) {
      if (logs) console.log(response);
      displayRecipes(response.recipes);
    }, // end success
    error: function(err) {
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end getRecipe

var getTotalRecipeCount = function() {
  if (logs) console.log('in getTotalRecipeCount');
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
      if (logs) console.log(err);
    } // end error
  }); // end ajax
}; // end getTotalRecipeCount

var makeRecipeIdArray = function(amount, maxNum){
  if (logs) console.log('in makeRecipeIdArray');
  numbers = [];
  if (logs) console.log('amount -->', amount);
  //choose a random number for each number of meals requested by user
  while (numbers.length < amount){
    num = getRandomInt(maxNum);
    //If the number of meals requested is less than or equal to number of recipes in the database
    if (amount <= maxNum) {
      //if the number is not already in the array:
      if ($.inArray(num, numbers) === -1) {
        //push random number into numbers array
        numbers.push(num);
      } // end if
    //If the number of meals requested is more than the number of recipes in the database:
    } else {
      //don't monitor duplicates. push numbers into array
      numbers.push(num);
    } // end else
  } // end while
  return numbers;
}; //end makeRecipeIdArray

var makeRecipeIngredientArray = function() {
  if (logs) console.log('in makeRecipeIngredientArray');
  //initialize blank array to add to
  var ingredients = [];
  //loop through each form line element
  $('.ingredient-form-line').each(function(i, line) {
    //make an object containing all the info for ingredient
    var ingredient = {
      amount: $(line).children().first().find('input').val(),
      measurementId: $(line).children(("div:nth-child(2)")).find('select').val(),
      ingredientId: $(line).children().last().find('select').val()
    }; // end ingredient
    //push the object into ingredients array
    ingredients.push(ingredient);
  }); // end forEach
  return ingredients;
}; // end makeRecipeIngredientArray

var makeRecipeNamesArray = function(objectArray, idArray) {
  if (logs) console.log('in makeRecipeNamesArray');
  var mealNames = [];
  //Loop through each recipe id chosen by randomizer
  for (var i = 0; i < idArray.length; i++) {
    //get the recipe name that matches the recipe id
    for (var ii = 0; ii < objectArray.length; ii++) {
      if (objectArray[ii].id === idArray[i]) {
        //give the object an occurence property to track how many times it was chosen
        objectArray[ii].occurence = 1;
        //push the name into the mealNames array
        mealNames.push(objectArray[ii]);
      } // end if
    } // end for
  } // end for
  return mealNames;
}; // end makeRecipeNamesArray

var reset = function() {
  if (logs) console.log('in reset');
  //clear lists and meals
  $('#mealsDiv').empty();
  $('.section-list').empty();
  //remove any elements added in recipe ingredients form
  $(".ingredient-form-line:not(:first)").remove();
  //Reset all of the forms
  $('form').trigger("reset");
  //hide the grocery list, show the main form
  $('#listDisplayDiv').hide();
  $('.hideable').fadeIn();
  $('#createRecipeForm').hide();
  //Remove H1 from #addIngredientsDiv
  $('#addIngredientsDiv').find('h1').remove();
  //Hide the #addIngredientsDiv
  $('#addIngredientsDiv').hide();
  //Reset text of #createRecipeButton
  $('#createRecipeButton').text('Create New Recipe');
  //Add focus to the main form's input
  $('#numMealsIn').focus();
  //set recipe button text
  $('#displayRecipesButton').text('View All Recipes');
}; // end reset

var setSectionColumn = function(section) {
  if (logs) console.log('in setSectionColumn');
  var $el;
  //Pick a section column div (depending on section name)
  if (section === 'Produce') { //for produce, print in column 1
    $el = $('#section-col-one');
  } else if (section === 'Dairy' || section === 'Meat') { //for dairy and meat, column 2
    $el = $('#section-col-two');
  } else if (section == 'Dry' || section === 'Canned') { // for dry/canned, column 3
    $el = $('#section-col-three');
  } else { //for frozen and other, column 4
    $el = $('#section-col-four');
  } // end else
  return $el;
}; // end setSectionColumn

var toggleCreateRecipeForm = function() {
  if (logs) console.log('in showCreateRecipeForm');
  //slide add recipe form into view
  $('#createRecipeForm').slideToggle();
  //Control button text on toggle
  if ($(this).text() === 'Create New Recipe') {
    $(this).text('Abandon Create Recipe');
  } else {
    $(this).text('Create New Recipe');
  } // end else
}; // end showCreateRecipeForm

var toggleRecipeVisibility = function() {
  if (logs) console.log('in toggleRecipeVisibility');
  //toggle visibility of resipes on button click
  $('.recipe-display').fadeToggle('fast');
  //Toggle button text to say View or Hide
  if ($('#displayRecipesButton').text() === 'View All Recipes') {
    $('#displayRecipesButton').text('Hide Recipes');
  } else {
    $('#displayRecipesButton').text('View All Recipes');
  } // end else
}; // end toggleRecipeVisibility
