//OBJECT CONSTRUCTOR FUNCTIONS
var Recipe = function(name,servings){
  this.name = name;
  this.servings= servings;
  this.ingredients= [];
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

//MAKE RECIPE OBJECTS
//Make Brown rice stir fry recipe
var brownRiceStirFry = new Recipe("Brown Rice Stir Fry", 3);
var stirFryIngredients = [
  ["Brown Rice", 1, "Cup"],
  ["Zucchini", 0.5, "item"],
  ["Red Bell Pepper", 0.5, "item"],
  ["Mushrooms", 0.5, "Cup"],
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
    ['Cheese',1,"Cup"]
];
addAllIngredients(pizzaIngredients, pizza);

//make mac n' cheese recipe
var macNcheese = new Recipe("Mac and Cheese", 2);
var macNcheeseIngredients = [
  ["Macaroni and Cheese", 1, "Box"],
  ["Milk", 2, "tbsp"],
  ["Cheese", 0.25, "Cup"]
];
addAllIngredients(macNcheeseIngredients, macNcheese);

//print recipes
//pizza.printRecipe();
//macNcheese.printRecipe();


var weeksMeals =[macNcheese, pizza];

//print the names of the meals you will be having this week
var printWeeksMeals = function(mealsArray){
  console.log("\n%cThis week's meals: ", "font-size: large");
  for (var i = 0; i < mealsArray.length; i++){
    console.log(mealsArray[i].name);
  }
};
//printWeeksMeals(weeksMeals);

var printGroceryList= function(mealsArray){
  console.log("\n%cThis week's grocery List: ", "font-size: large");
  groceryList = [];
  for (i = 0; i < mealsArray.length; i++){
    for (x = 0; x < mealsArray[i].ingredients.length; x++){
      groceryList.push(mealsArray[i].ingredients[x]);
    }
  }
  for (var i = 0; i < groceryList.length; i++){
    console.log(groceryList[i].amount+" "+groceryList[i].measurement+" "+groceryList[i].item);
  }
  return groceryList;
};
printGroceryList(weeksMeals);

////////Condenses grocery list

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
    return output;
});

//console.dir(output);
//console.log(output);

console.log("\n%cCondensed grocery List: ", "font-size: large");
for (var i = 0; i < output.length; i++) {
  console.log(output[i].amount+" "+output[i].measurement+" "+output[i].item);
}
