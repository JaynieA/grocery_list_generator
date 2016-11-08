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
      if (this.ingredients[i].amount === 0.5) {
        this.ingredients[i].amount = "1/2";
      }
      if(this.ingredients[i].measurement === "item") {
        console.log(this.ingredients[i].amount+" "+this.ingredients[i].item +"\n");
      } else {
        console.log(this.ingredients[i].amount+" "+this.ingredients[i].measurement+" "+this.ingredients[i].item +"\n");
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

var chooseWeeksMeals = function(amount){
  numbers = [];
  while (numbers.length<amount){
    num = getRandomInt();
    if ($.inArray(num, numbers) === -1) {
      numbers.push(num);
    }
  }
  for (var i = 0; i <numbers.length; i++) {
    weeksMeals.push(allMeals[numbers[i]]);
  }
  return weeksMeals;
}; //end chooseWeeksMeals

var getRandomInt = function() {
  min = Math.ceil(0);
  max = Math.floor(allMeals.length);
  num = Math.floor(Math.random()*(max-min))+min;
  return num;
}; //end getRandomInt

var printGroceryList= function(mealsArray){
  groceryList = [];
  //add all ingredients in mealsArray objects to groceryList array
  for (i = 0; i < mealsArray.length; i++){
    for (x = 0; x < mealsArray[i].ingredients.length; x++){
      groceryList.push(mealsArray[i].ingredients[x]);
    }
  }
  //Condense grocery list if an ingredient item and measurement are the same
  var output = [];
  groceryList.forEach(function(value) {
      var existing = output.filter(function(v, i) {
          return v.item == value.item && v.measurement == value.measurement;
      });
      if(existing.length) {
          var existingIndex = output.indexOf(existing[0]);
          output[existingIndex].amount = output[existingIndex].amount+value.amount;
      }
      else {
          if(typeof value.amount == 'number')
              value.amount = value.amount;
          output.push(value);
      }
  });
  //Print formatted grocery list
  //console.log("\n%cGrocery List: ", "font-size: large");
  for (var i = 0; i < output.length; i++) {
    if (output[i].amount === 0.5){
      output[i].amount = "1/2";
    }
    if (output[i].amount === 0.25) {
      output[i].amount = "1/4";
    }
    if (output[i].amount === 0.75) {
      output[i].amount = "3/4";
    }
    if (output[i].measurement === "item") {
      output[i].measurement = '';
    }
    //$('#groceryList').html($('#groceryList').html()+"<li>"+ output[i].amount+" "+output[i].measurement+" "+output[i].item+"</li>");
    //console.log(output[i].amount+" "+output[i].measurement+" "+output[i].item);
    if (output[i].category === "Produce") {
      $('#produce').html($('#produce').html()+"<li>"+ output[i].amount+" "+output[i].measurement+" "+output[i].item+"</li>");
    }
    if (output[i].category === "Frozen") {
      $('#frozen').html($('#frozen').html()+"<li>"+ output[i].amount+" "+output[i].measurement+" "+output[i].item+"</li>");
    }
    if (output[i].category === "Dairy") {
      $('#dairy').html($('#dairy').html()+"<li>"+ output[i].amount+" "+output[i].measurement+" "+output[i].item+"</li>");
    }
    if (output[i].category === "Meat") {
      $('#meat').html($('#meat').html()+"<li>"+ output[i].amount+" "+output[i].measurement+" "+output[i].item+"</li>");
    }
    if (output[i].category === "Other") {
      $('#other').html($('#other').html()+"<li>"+ output[i].amount+" "+output[i].measurement+" "+output[i].item+"</li>");
    }
    if (output[i].category === "Dry") {
      $('#dry').html($('#dry').html()+"<li>"+ output[i].amount+" "+output[i].measurement+" "+output[i].item+"</li>");
    }
    if (output[i].category === "Canned") {
      $('#canned').html($('#canned').html()+"<li>"+ output[i].amount+" "+output[i].measurement+" "+output[i].item+"</li>");
    }

  }
  return output;
}; //end makeGroceryList

var printWeeksMeals = function(mealsArray){
  //console.log("\n%cThis week's meals: ", "font-size: large");
  for (var i = 0; i < mealsArray.length; i++){
    //console.log(mealsArray[i].name);
    $('#meals').html($('#meals').html()+"<p>"+mealsArray[i].name+"</p>");
  }
}; //end printWeeksMeals


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
  ["Crushed Red Pepper Flakes", 0.5, "tsp", "Other"],
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
  ["Red Bell Pepper", 0.5, "item", "Produce"],
  ["Garlic", 1, "Clove", "Produce"],
  ["Olive Oil", 1, "tbsp", "Other"],
  ["Ricotta Cheese", 15, "oz", "Dairy"],
  ["Shredded Cheese", 1.5, "Cup", "Dairy"],
  ["Eggs", 1, "item", "Dairy"]
];
addAllIngredients(lasagnaIngredients, lasagna);

//make Cauliflower Buffalo Wings Recipe
var cauliBuffaloWings = new Recipe("Cauliflower Buffalo Wings", 2);
var cauliBuffaloWingsIngredients = [
  ["Brown Rice Flower", 3/4, "Cup", "Dry"],
  ["Paprika", 1, "tsp", "Other"],
  ["Garlic Powder", 2, "tsp", "Other"],
  ["Cauliflower", 1, "Head", "Produce"],
  ["Franks Hot Sauce", 3/4, "Cup", "Other"],
  ["Avocado", 1, "item", "Produce"],
];
addAllIngredients(cauliBuffaloWingsIngredients, cauliBuffaloWings);

//make Fancy Grilled Cheese Recipe
var grilledCheese = new Recipe("Fancy Grilled Cheese and Tomato Soup", 2);
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

//PRINT RECIPES
//spicyThaiNoodles.printRecipe();
//macNcheese.printRecipe();

weeksMeals = [];

var revealList =  function() {
  $('.hideable').hide();
  $('.results').show();
  var numMeals = $('#numMeals').val();
  chooseWeeksMeals(numMeals);
  printWeeksMeals(weeksMeals);
  printGroceryList(weeksMeals);
  return weeksMeals;
};
