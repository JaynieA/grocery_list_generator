var allMeals = [];

//OBJECT CONSTRUCTOR FUNCTIONS
var Recipe = function(name,servings){
  this.name = name;
  this.servings= servings;
  this.ingredients= [];
  allMeals.push(this);
}; //end Recipe

var Ingredient = function(item, amount, measurement){
  this.item = item;
  this.amount = amount;
  this.measurement = measurement;
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
    recipeObject.addIngredient(new Ingredient(completeIngredientsArray[0], completeIngredientsArray[1], completeIngredientsArray[2]));
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
  console.log("\n%cGrocery List: ", "font-size: large");
  for (var i = 0; i < output.length; i++) {
    if (output[i].amount === 0.5){
      output[i].amount = "1/2";
    }
    if (output[i].amount === 0.25) {
      output[i].amount = "1/4";
    }
    if (output[i].measurement === "item") {
      output[i].measurement = '';
    }
    console.log(output[i].amount+" "+output[i].measurement+" "+output[i].item);
  }
  return output;
}; //end makeGroceryList

var printWeeksMeals = function(mealsArray){
  console.log("\n%cThis week's meals: ", "font-size: large");
  for (var i = 0; i < mealsArray.length; i++){
    console.log(mealsArray[i].name);
  }
}; //end printWeeksMeals

//MAKE RECIPE OBJECTS
//Make Brown rice stir fry recipe
var brownRiceStirFry = new Recipe("Brown Rice Stir Fry", 3);
var stirFryIngredients = [
  ["Brown Rice", 1, "Cup"],
  ["Zucchini", 0.5, "item"],
  ["Red Bell Pepper", 0.5, "item"],
  ["Mushrooms", 5 , "oz"],
  ["Soy Sauce", 3, "tbsp"],
  ["Parsley", 2, "tbsp"],
  ["Garlic", 4, "Cloves"],
  ["Jalapeno", 0.5, "item"],
  ["Cabbage", 1, "Cup"],
  ["Broccoli", 0.5, "Head"],
  ["Olive Oil", 1, "tbsp"]
];
addAllIngredients(stirFryIngredients, brownRiceStirFry);

//Make One Pan Mexican Quinoa recipe
var onePanMexQuinoa = new Recipe("One Pan Mexican Quinoa", 4);
var mexQuinoaIngredients = [
  ["Olive Oil", 1, "tbsp"],
  ["Garlic", 2, "Cloves"],
  ["Jalapeno", 1, "item"],
  ["Quinoa", 1, "Cup"],
  ["Vegetable Broth", 1, "Cup"],
  ["Black Beans", 1, "15 oz. Can"],
  ["Fire Roasted Diced Tomatoes", 1, "14.5 oz Can"],
  ["Corn Kernels", 1, "Cup"],
  ["Chili Powder", 1, "tsp"],
  ["Cumin", 0.5, "tsp"],
  ["Lime", 1, "item"],
  ["Cilantro", 2, "tbsp"]
];
addAllIngredients(mexQuinoaIngredients, onePanMexQuinoa);

//Make Pizza Recipe
var pizza = new Recipe("Pizza", 2);
var pizzaIngredients = [
    ["Pizza Crusts",1,"package"],
    ['Cheese',1,"Cup"],
    ['Marinara Sauce', 0.5, "Cup"]
];
addAllIngredients(pizzaIngredients, pizza);

//make mac n' cheese recipe
var macNcheese = new Recipe("Mac and Cheese and Green Beans", 2);
var macNcheeseIngredients = [
  ["Macaroni and Cheese", 1, "Box"],
  ["Milk", 2, "tbsp"],
  ["Shredded Cheese", 0.25, "Cup"],
  ["Butter",1, "tbsp"],
  ["Parmesan Cheese", 0.5, "Cup"],
  ["Green Beans", 1, "Package"]
];
addAllIngredients(macNcheeseIngredients, macNcheese);

//make Spicy Thai Noodles Recipe
var spicyThaiNoodles = new Recipe("One Pot Spicy Thai Noodles", 4);
var spicyThaiNoodlesIngredients = [
  ["Linguine Noodles", 1,"Lb"],
  ["Olive Oil", 2, "tbsp"],
  ["Eggs", 2, "item"],
  ["Crushed Red Pepper Flakes", 0.5, "tsp"],
  ["Zucchini", 1, "item"],
  ["Mushrooms", 10, "oz"],
  ["Garlic", 3, "Cloves"],
  ["Brown Sugar", 2, "tbsp"],
  ["Soy Sauce", 6, "tbsp"],
  ["Sriracha", 1, "tbsp"],
  ["Ginger Root", 2, "inches"],
  ["Cilantro", 1, "handful"],
  ["Green Onions", 4, "item"]
];
addAllIngredients(spicyThaiNoodlesIngredients, spicyThaiNoodles);

//make gnocci and green beans Recipe
var gnocciAndGreenBeans = new Recipe("Sweet Potato Gnocci and Parmesan Green Beans", 2);
var gnocciAndBeansIngredients = [
  ["Sweet Potato Gnocci", 1, "Frozen Package"],
  ["Green Beans", 1, "Package"],
  ["Parmesan", 0.25, "Cup"],
  ["Butter", 0.5, "tbsp"]
];
addAllIngredients(gnocciAndBeansIngredients, gnocciAndGreenBeans);

//PRINT RECIPES
//spicyThaiNoodles.printRecipe();
//macNcheese.printRecipe();

weeksMeals = [];


chooseWeeksMeals(4);
printWeeksMeals(weeksMeals);
printGroceryList(weeksMeals);
