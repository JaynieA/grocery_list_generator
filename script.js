console.log('sourced script.js');

//  FUNCTIONS
var addIngredient = function (ingredientObject, item, amount, measurement) {
  ingredientObject.numIngredients++;
  ingredientObject["ingredient"+ingredientObject.numIngredients]= {item: item, amount: amount, measurement: measurement};
};

var printRecipe = function(ingredientObject, recipeName) {
  console.log(recipeName+":");
  console.log("");
  for (var i = 1; i < ingredientObject.numIngredients; i++) {
    var item = ingredientObject["ingredient"+[i]].item;
    var amount = ingredientObject["ingredient"+[i]].amount;
    var measurement = ingredientObject["ingredient"+[i]].measurement;
    console.log(item+":", amount, measurement);
  }
  console.log("");
};



//  OBJECTS

//Ingredient Objects
var stirFryIngredients = {
  ingredient1: {item: "Brown Rice", amount: 1, measurement: "Cup"},
  ingredient2: {item: "Zucchini", amount: 0.5, measurement: "Cup"},
  ingredient3: {item: "Red Bell Pepper", amount: 0.5, measurement: "of ingredient item"},
  ingredient4: {item: "Mushrooms", amount: 0.5, measurement: "Cup"},
  numIngredients: 4
};

var mexQuinoaIngredients = {
  numIngredients: 0
};

//Recipe Object
var weeksMeals = {
  recipe1: {name: "Brown Rice Stir Fry", servings: 2, ingredients: stirFryIngredients},
  recipe2: {name: "One Pan Mexican Quinoa", servings: 4, ingredients: mexQuinoaIngredients}
};


//  FUNCTION CALLS
//add brown rice stir fry ingredients
addIngredient(stirFryIngredients, "Soy Sauce", 3, "tbsp");
addIngredient(stirFryIngredients, "Parsley", 2, "tbsp");
addIngredient(stirFryIngredients, "Garlic", 4, "Cloves");
addIngredient(stirFryIngredients, "Jalapeno", 0.25, "of ingredient item");
addIngredient(stirFryIngredients, "Cabbage", 1, "Cup");
addIngredient(stirFryIngredients, "Broccoli", 0.5, "Head");
addIngredient(stirFryIngredients, "Olive Oil", 1, "tbsp");

//add mexican quinoa ingredients
addIngredient(mexQuinoaIngredients, "Olive Oil", 1, "tbsp");
addIngredient(mexQuinoaIngredients, "Garlic", 2, "Cloves");
addIngredient(mexQuinoaIngredients, "Jalapeno", 1, "of ingredient item");
addIngredient(mexQuinoaIngredients, "Quinoa", 1, "Cup");
addIngredient(mexQuinoaIngredients, "Vegetable Broth", 1, "Cup");
addIngredient(mexQuinoaIngredients, "Black Beans", 1, "15 oz. Can");
addIngredient(mexQuinoaIngredients, "Fire Roasted Diced Tomatoes", 1, "14.5 oz Can");
addIngredient(mexQuinoaIngredients, "Corn Kernels", 1, "Cup");
addIngredient(mexQuinoaIngredients, "Chili Powder", 1, "tsp");
addIngredient(mexQuinoaIngredients, "Cumin", 0.5, "tsp");
addIngredient(mexQuinoaIngredients, "Lime", 1, "of ingredient item");
addIngredient(mexQuinoaIngredients, "Cilantro", 2, "tbsp");

printRecipe(stirFryIngredients, weeksMeals.recipe1.name);

printRecipe(mexQuinoaIngredients, weeksMeals.recipe2.name);




var printGroceryList= function(mealsArray){
  console.log("\n%cThis week's grocery List: ", "font-size: large");
  groceryList = [];
  //for every meal in weeksMeals
  for (var i=0; i<mealsArray.length; i++){
    //for every ingredient in weeksMeals
    for (var y=0; y<mealsArray[i].ingredients.length; y++){
      if (groceryList.length === 0){
        groceryList.push([mealsArray[i].ingredients[y].item,mealsArray[i].ingredients[y].amount,mealsArray[i].ingredients[y].measurement]);
      } else {
        //for each ingredient in the groceryList
        for (var x = 0; x<groceryList.length; x++){
          //console.log(mealsArray[i].ingredients[y].item);
          if(mealsArray[i].ingredients[y].item != groceryList[x][0]){ //if item is not already on the grocery list
            //add it
            console.log(mealsArray[i].ingredients[y].item+" is not equal to "+groceryList[x][0])
            console.log("So add "+ mealsArray[i].ingredients[y].item+" to the array");
            groceryList.push([mealsArray[i].ingredients[y].item,mealsArray[i].ingredients[y].amount,mealsArray[i].ingredients[y].measurement]);

          } else {
            //else just add it to the amount if the measurement type and name match
            console.log(mealsArray[i].ingredients[y].item+" is already in the array.");
          }
        }
      }
    }
  }
