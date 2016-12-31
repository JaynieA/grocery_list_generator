var allMeals = [];

//OBJECT CONSTRUCTOR FUNCTIONS
var Recipe = function(name,servings){
  this.name = name;
  this.servings= servings;
  this.ingredients= [];
  allMeals.push(this);
}; //end Recipe

var Ingredient = function(item, amount, measurement, category){
  this.item = item;
  this.amount = amount;
  this.measurement = measurement;
  this.category = category;
};//end Ingredient

//PROTOTYPE FUNCTIONS
Recipe.prototype = {
  addIngredient: function(newIngredient){
    this.ingredients.push(newIngredient);
  }, //end addIngredient
  printRecipe: function(){
    console.log("\n%c"+this.name, "font-size: large");
    for (var i = 0; i < this.ingredients.length; i++){
      var amount = new Fraction(this.ingredients[i].amount);
      var fractionAmt = amount.toFraction(true);
      if(this.ingredients[i].measurement === "item") {
        console.log(fractionAmt+" "+this.ingredients[i].item +"\n");
      } else {
        console.log(fractionAmt+" "+this.ingredients[i].measurement+" "+this.ingredients[i].item +"\n");
      }
    }
  } //end printRecipe
};

//OTHER FUNCTIONS
var addAllIngredients = function(completeIngredientsArray, recipeObject){
  $.each(completeIngredientsArray, function(index, completeIngredientsArray) {
    recipeObject.addIngredient(new Ingredient(completeIngredientsArray[0], completeIngredientsArray[1], completeIngredientsArray[2], completeIngredientsArray[3]));
  });
}; //end addAllIngredients

//MAKE RECIPE OBJECTS
//Make Brown rice stir fry recipe
var brownRiceStirFry = new Recipe("Brown Rice Stir Fry", 3);
var stirFryIngredients = [
  ["Brown Rice", 1, "Cup", "Dry"],
  ["Zucchini", 0.5, "item", "Produce"],
  ["Red Bell Pepper", 0.5, "item", "Produce"],
  ["Mushrooms", 5 , "oz", "Produce"],
  ["Soy Sauce", 3, "tbsp", "Other"],
  ["Parsley", 2, "tbsp", "Produce"],
  ["Garlic", 4, "Cloves", "Produce"],
  ["Jalapeno", 0.5, "item", "Produce"],
  ["Cabbage", 1, "Cup", "Produce"],
  ["Broccoli", 0.5, "Head", "Produce"],
  ["Olive Oil", 1, "tbsp", "Other"]
];
addAllIngredients(stirFryIngredients, brownRiceStirFry);

//Make One Pan Mexican Quinoa recipe
var onePanMexQuinoa = new Recipe("One Pan Mexican Quinoa", 4);
var mexQuinoaIngredients = [
  ["Olive Oil", 1, "tbsp", "Other"],
  ["Garlic", 2, "Cloves", "Produce"],
  ["Jalapeno", 1, "item", "Produce"],
  ["Quinoa", 1, "Cup", "Dry"],
  ["Vegetable Broth", 1, "Cup", "Canned"],
  ["Black Beans", 1, "15 oz. Can", "Canned"],
  ["Fire Roasted Diced Tomatoes", 1, "14.5 oz Can", "Canned"],
  ["Corn Kernels", 1, "Cup", "Canned"],
  ["Chili Powder", 1, "tsp", "Other"],
  ["Cumin", 0.5, "tsp", "Other"],
  ["Lime", 1, "item", "Produce"],
  ["Cilantro", 2, "tbsp", "Produce"]
];
addAllIngredients(mexQuinoaIngredients, onePanMexQuinoa);

//Make Pizza Recipe
var pizza = new Recipe("Pizza", 2);
var pizzaIngredients = [
    ["Pizza Crusts",1,"package", "Dry"],
    ['Cheese',1,"Cup", "Dairy"],
    ['Marinara Sauce', 0.5, "Cup", "Canned"]
];
addAllIngredients(pizzaIngredients, pizza);

//make mac n' cheese recipe
var macNcheese = new Recipe("Mac and Cheese and Green Beans", 2);
var macNcheeseIngredients = [
  ["Macaroni and Cheese", 1, "Box", "Dry"],
  ["Milk", 2, "tbsp", "Dairy"],
  ["Shredded Cheese", 0.25, "Cup", "Dairy"],
  ["Butter",1, "tbsp", "Dairy"],
  ["Parmesan Cheese", 0.5, "Cup", "Dairy"],
  ["Green Beans", 1, "Package", "Produce"]
];
addAllIngredients(macNcheeseIngredients, macNcheese);

//make Spicy Thai Noodles Recipe
var spicyThaiNoodles = new Recipe("One Pot Spicy Thai Noodles", 4);
var spicyThaiNoodlesIngredients = [
  ["Linguine Noodles", 1,"Lb", "Dry"],
  ["Olive Oil", 2, "tbsp", "Other"],
  ["Eggs", 2, "item", "Dairy"],
  ["Red Pepper Flakes", 0.5, "tsp", "Other"],
  ["Zucchini", 1, "item", "Produce"],
  ["Mushrooms", 10, "oz", "Produce"],
  ["Garlic", 3, "Cloves", "Produce"],
  ["Brown Sugar", 2, "tbsp", "Dry"],
  ["Soy Sauce", 6, "tbsp", "Other"],
  ["Sriracha", 1, "tbsp", "Other"],
  ["Ginger Root", 2, "inches", "Produce"],
  ["Cilantro", 1, "handful", "Produce"],
  ["Green Onions", 4, "item", "Produce"],
  ["Chicken Breast", 1, "item", "Meat"]
];
addAllIngredients(spicyThaiNoodlesIngredients, spicyThaiNoodles);

//make gnocci and green beans Recipe
var gnocciAndGreenBeans = new Recipe("Sweet Potato Gnocci and Parmesan Green Beans", 2);
var gnocciAndBeansIngredients = [
  ["Sweet Potato Gnocci", 1, "Frozen Package", "Frozen"],
  ["Green Beans", 1, "Package", "Produce"],
  ["Parmesan", 0.25, "Cup", "Dairy"],
  ["Butter", 0.5, "tbsp", "Dairy"]
];
addAllIngredients(gnocciAndBeansIngredients, gnocciAndGreenBeans);

//make White Chili Recipe
var whiteChili = new Recipe("White Chili", 6);
var whiteChiliIngredients = [
  ["Red Potato", 1.5, "lbs", "Produce"],
  ["Great Northern Beans", 2, "Can", "Canned"],
  ["Rotel", 3, "Can", "Canned"],
  ["Onion", 1, "item", "Produce"],
  ["Jalapeno", 4, "item", "Produce"],
  ["Chicken or Beef", 1, "lb", "Meat"],
  ["Heavy Cream", 1, "Pint", "Dairy"],
  ["Shredded Cheddar Cheese", 1, "Package", "Dairy"]
];
addAllIngredients(whiteChiliIngredients, whiteChili);

//make Crock Pot Veggie Lasagna Recipe
var lasagna = new Recipe("Crock Pot Veggie Lasagna", 4);
var lasagnaIngredients = [
  ["Pasta Sauce", 1, "24 oz Jar", "Canned"],
  ["Pasta Sauce", 1, "Cup", "Canned"],
  ["Long Lasagna Noodles", 9 , "item", "Dry"],
  ["Onion", 0.15, "item", "Produce"],
  ["Mushrooms", 5, "oz", "Produce"],
  ["Garlic", 1, "Clove", "Produce"],
  ["Olive Oil", 1, "tbsp", "Other"],
  ["Ricotta Cheese", 15, "oz", "Dairy"],
  ["Shredded Cheese", 1.5, "Cup", "Dairy"],
  ["Eggs", 1, "item", "Dairy"]
];
addAllIngredients(lasagnaIngredients, lasagna);

//make Cauliflower Buffalo Wings Recipe
var cauliBuffaloWings = new Recipe("Cauliflower Buffalo Wings and Mushroom Risotto", 2);
var cauliBuffaloWingsIngredients = [
  ["Brown Rice Flower", 3/4, "Cup", "Dry"],
  ["Paprika", 1, "tsp", "Other"],
  ["Garlic Powder", 2, "tsp", "Other"],
  ["Cauliflower", 1, "Head", "Produce"],
  ["Franks Hot Sauce", 3/4, "Cup", "Other"],
  ["Avocado", 1, "item", "Produce"],
  ["Mushroom Risotto", 1, "Package", "Frozen"],
  ["Chicken Breast", 1, "item", "Meat"]
];
addAllIngredients(cauliBuffaloWingsIngredients, cauliBuffaloWings);

//make Fancy Grilled Cheese Recipe
var grilledCheese = new Recipe("Grilled Cheese and Tomato Soup", 2);
var grilledCheeseIngredients = [
  ["Jalapeno", 1, "item", "Produce"],
  ["Cheddar Cheese", 2, "Slices", "Dairy"],
  ["Avocado", 0.5, "item", "Produce"],
  ["Small Tomato", 1, "item", "Produce"],
  ["Bread", 4, "Slices"],
  ["Butter", 1.5, "tbsp", "Dairy"],
  ["Tomato Soup", 1, "Box"],
  ["Ketchup", 4, "tbsp", "Other"]
];
addAllIngredients(grilledCheeseIngredients, grilledCheese);

//make Vegetarian Lettuce Wraps Recipe
var lettuceWrap = new Recipe("Vegetarian Lettuce Wraps", 4);
var lettuceWrapIngredients = [
  ["Hoisin Sauce", 3, "tbsp", 'Other'],
  ["Soy Sauce", 3, "tbsp", "Other"],
  ["Rice Vinegar", 2, "tbsp", "Other"],
  ["Olive Oil", 1, "tsp", "Other"],
  ["Canola Oil", 2, "tsp", "Other"],
  ["Extra Firm Tofu", 1, "Package", "Other"],
  ["Baby Bella (Cremini) Mushrooms", 8 , "oz", "Produce"],
  ["Water Chestnuts", 1, "8 oz. Can", "Canned"],
  ["Garlic", 2, "Clove", "Produce"],
  ["Ginger Root", 3, "inches", "Produce"],
  ["Red Pepper Flakes", 0.75, "tsp", "Other"],
  ["Green Onions", 4, "item", "Produce"],
  ["Romaine Lettuce", 8, "Large Leaves", "Produce"]
];
addAllIngredients(lettuceWrapIngredients, lettuceWrap);

//Make Zucchini Burrito Boats Recipe
var burritoBoats = new Recipe("Zuccini Burrito Boats", 4);
var burritoBoatIngredients = [
  ["Zucchini", 4, "item", "Produce"],
  ["Black Beans", 1, "15 oz Can", "Canned"],
  ["Brown Rice", 1, "Cup", "Dry"],
  ["Salsa", 1, "Cup", "Canned"],
  ["Red Bell Pepper", 1, "item", "Produce"],
  ["Red Onion", 0.5, "item", "Produce"],
  ["Corn Kernels", 0.5, "Cup", "Canned"],
  ["Jalapeno", 1, "item", "Produce"],
  ["Olive Oil", 1, "tbsp", "Other"],
  ["Cumin", 2, "tsp", "Other"],
  ["Chili Powder", 2, "tsp", "Other"],
  ["Cilantro", 0.5, "Cup", "Produce"],
  ["Shredded Cheddar Cheese", 1, "Cup", "Dairy"]
];
addAllIngredients(burritoBoatIngredients, burritoBoats);

//Make Bacon and Brussel Sprout Penne Recipe
var brusselSproutPenne = new Recipe("Bacon and Brussel Sprout Penne", 4);
var brusselSproutPenneIngredients = [
  ["Penne Pasta", 1, "lb", "Dry"],
  ["Bacon", 6, "slices", "Meat"],
  ["Brussel Sprouts", 12, "oz", "Produce"],
  ["Salt", 0.5, "tsp", "Other"],
  ["Pepper", 0.5, "tsp", "Other"],
  ["Green Onions", 2, "item", "Produce"],
  ["Dried Cranberries", 0.5, "Cup", "Dry"],
  ["Dry White Wine", 0.5, "Cup", "Other"],
  ["Feta Cheese", 0.4, "Cup", "Dairy"]
];
addAllIngredients(brusselSproutPenneIngredients, brusselSproutPenne);

//Make Broccoli Quinoa Casserole
var broccoliQuinoaCasserole = new Recipe("Broccoli Quinoa Casserole", 4);
var broccoliQuinoaCasseroleIngredients = [
  ["Quinoa", 2.5, "Cup", "Dry"],
  ["Vegetable Broth", 4.5, "Cup", "Canned"],
  ["Pesto Sauce", 2, "tbsp", "Canned"],
  ["Salt", 0.5, "tsp", "Other"],
  ["Arrowroot powder or Cornstarch", 2, "tsp", "Dry"],
  ["Spinach", 2, "Cup", "Produce"],
  ["Mozzarella Cheese", 15, "oz", "Dairy"],
  ["Parmesan Cheese", (1/3), "Cup", "Dairy"],
  ["Broccoli Florets", 12, "oz", "Produce"],
  ["Green Onions", 3, "item", "Produce"]
];
addAllIngredients(broccoliQuinoaCasseroleIngredients, broccoliQuinoaCasserole);

//Make Easy Pantry Pasta
var pantryPasta = new Recipe("Easy Pantry Pasta", 4);
var pantryPastaIngredients = [
  ["Country Bread", 2, "Slices", "Dry"],
  ["Olive Oil", 6, "tbsp", "Other"],
  ["Yellow Onion", 0.5, "item", "Produce"],
  ["Garlic", 2, "Cloves", "Produce"],
  ["Crushed Red Pepper", 0.75, "tsp", "Other"],
  ["Salt", 0.25, "tsp", "Other"],
  ["Parsley", 3, "tbsp", "Produce"],
  ["Capers", 2, "tbsp", "Canned"],
  ["Lemon", 1, "item", "Produce"],
  ["Spaghetti or Linguine Noodles", 0.75, "lb", "Dry"],
  ["Eggs", 3, "item", "Dairy"],
  ["Parmesan", 0.5, "Cup", "Dairy"]
];
addAllIngredients(pantryPastaIngredients, pantryPasta);

//Make Tortilla Soup
var tortillaSoup = new Recipe("Vegetarian Tortilla Soup", 2);
var tortillaSoupIngredients = [
  ["Olive Oil", 1, "tbsp", "Other"],
  ["White Onion", 1, "item", "Produce"],
  ["Garlic", 2, "Cloves", "Produce"],
  ["Jalapeno", 1, "item", "Produce"],
  ["Cumin", 1, "tsp", "Other"],
  ["Crushed Tomatos", 1, "14 oz Can", "Canned"],
  ["Vegetable Broth", 4, "Cup", "Canned"],
  ["Black Beans", 1, "15 oz. Can", "Canned"],
  ["Corn Chips", 1, "Bag", "Dry"],
  ["Avocado", 1, "item", "Produce"],
  ["Feta Cheese", 0.5, "Cup", "Dairy"],
  ["Lime", 1, "item", "Produce"]
];
addAllIngredients(tortillaSoupIngredients, tortillaSoup);

//Add Amish Breakfash Casserole
var breakfastCasserole = new Recipe("Amish Breakfast Casserole", 4);
var breakfastCasseroleIngredients = [
  ["Bacon", 3, "Slices", "Meat"],
  ["Sweet Onion", 0.5, "item", "Produce"],
  ["Eggs", 3, "item", "Dairy"],
  ["Potato", 1, "Cup", "Produce"],
  ["Shredded Cheddar Cheese", 1, "Cup", "Dairy"],
  ["4% Cottage Cheese", 6, "oz", "Dairy"],
  ["Shredded White Cheddar Cheese", 3/4, "Cup", "Dairy"]
];
addAllIngredients(breakfastCasseroleIngredients, breakfastCasserole);


// ~~~~ TESTING ROUTES ~~~~~~
//TODO: clean up init
//TODO: add the rest of the recipes to the database
//TODO: clarify the function names or order of calls on user form submit
//TODO: condense ingredient objecs before displaying them on list

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
  getTotalRecipeCount();
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
      //console.log(response);
      appendIngredientsToListSections(response.ingredientList);
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








//OLD FUNCTIONS

// var printGroceryList= function(mealsArray){
//   console.log('in printGroceryList');
//   groceryList = [];
//   //add all ingredients in mealsArray objects to groceryList array
//   for (i = 0; i < mealsArray.length; i++){
//     for (x = 0; x < mealsArray[i].ingredients.length; x++){
//       groceryList.push(mealsArray[i].ingredients[x]);
//     }
//   }
//   //Condense grocery list if an ingredient item and measurement are the same
//   var output = [];
//   groceryList.forEach(function(value) {
//       var existing = output.filter(function(v, i) {
//           return v.item == value.item && v.measurement == value.measurement;
//       });
//       if(existing.length) {
//           var existingIndex = output.indexOf(existing[0]);
//           output[existingIndex].amount = output[existingIndex].amount+value.amount;
//       }
//       else {
//           if(typeof value.amount == 'number')
//               value.amount = value.amount;
//           output.push(value);
//       }
//   });
//   //Print formatted grocery list
//   //console.log("\n%cGrocery List: ", "font-size: large");
//   for (var i = 0; i < output.length; i++) {
//     var amount = new Fraction(output[i].amount);
//     var fractionAmt = amount.toFraction(true);
//     if (output[i].measurement === "item") {
//       output[i].measurement = '';
//     }
//     //$('#groceryList').html($('#groceryList').html()+"<li>"+ output[i].amount+" "+output[i].measurement+" "+output[i].item+"</li>");
//     //console.log(output[i].amount+" "+output[i].measurement+" "+output[i].item);
//     //Iterate through categories and assign to DOM element
//     var categories = [
//       ["Produce", "#produce"],
//       ["Frozen", '#frozen'],
//       ['Dairy', '#dairy'],
//       ['Meat', '#meat'],
//       ['Other', '#other'],
//       ['Dry', '#dry'],
//       ['Canned', '#canned']
//     ];
//     for (var z = 0; z < categories.length; z++) {
//       var category = categories[z][0];
//       var id = categories[z][1];
//       if (output[i].category === category) {
//         $(id).html($(id).html()+"<li>"+ fractionAmt+" "+output[i].measurement+" "+output[i].item+"</li>");
//       }
//     }
//   }
//   return output;
// }; //end makeGroceryList

// var printWeeksMeals = function(mealsArray){
//   console.log('in printWeeksMeals');
//   //console.log("\n%cThis week's meals: ", "font-size: large");
//   for (var i = 0; i < mealsArray.length; i++){
//     //console.log(mealsArray[i].name);
//     $('#meals').html($('#meals').html()+"<p>"+mealsArray[i].name+"</p>");
//   } // end for
// }; //end printWeeksMeals

//weeksMeals = [];
