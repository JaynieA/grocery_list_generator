var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );
var connection = require('../modules/connection');

//get all ingredients for one recipe
router.get('/', function(req,res) {
  var ingredients = [];
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      //build query string
      var queryText = 'SELECT recipes.name AS recipe_name, recipe_ingredients.ingredient_amount AS amount, ';
      queryText += 'measurements.name as measurement, ingredients.name AS ingredient, store_section.name AS section ';
      queryText += 'FROM recipes ';
      queryText += 'JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id ';
      queryText += 'JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id ';
      queryText += 'JOIN store_section ON ingredients.store_section_id = store_section.id ';
      queryText += 'JOIN measurements ON recipe_ingredients.measurement_id = measurements.id ';
      queryText += 'WHERE recipe_ingredients.recipe_id = $1';
      var query = client.query(queryText, [req.query.id]);
      query.on('row', function(row) {
        //push all ingredients for the recipe into an array
        ingredients.push(row);
      }); // end on query
      query.on('end', function() {
        done();
        res.send({recipe:ingredients});
      }); // query end
    } // end else
  }); // end pg connect
}); // end get

//get ingredients for many recipes
router.get('/list', function(req,res) {
  numRecipes = req.query.totalNum;
  //get the id's from the parameters in url
  idArray = [];
  for (var i = 1; i <= numRecipes; i++) {
    //push id into idArray
    idArray.push(req.query['id'+i]);
  } // end for
  //construct the WHERE/OR clause of the query
  var whereOr = '';
  for (var ii = 0; ii < idArray.length; ii++) {
    if (ii === 0) {
      whereOr += 'WHERE recipe_ingredients.recipe_id = ' + idArray[ii];
    } else {
      whereOr += ' OR recipe_ingredients.recipe_id = ' + idArray[ii];
    } // end else
  } // end for
  //Put the entire query together
  var queryString = 'SELECT recipe_ingredients.ingredient_amount AS amount, measurements.name as measurement, ';
  queryString += 'ingredients.name AS ingredient, store_section.name AS section ';
  queryString += 'FROM recipes ';
  queryString += 'JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id ';
  queryString += 'JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id ';
  queryString += 'JOIN store_section ON ingredients.store_section_id = store_section.id ';
  queryString += 'JOIN measurements ON recipe_ingredients.measurement_id = measurements.id ';
  queryString += whereOr;
  //initiaze ingredient list
  var ingredientList = [];
  //connect to the database
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      var query = client.query(queryString);
      query.on('row', function(row) {
        ingredientList.push(row);
      }); // end on query
      query.on('end', function() {
        done();
        res.send({ingredientList: ingredientList});
      }); // end query end
    } // end else
  }); // end pg connect

  //res.send(numRecipes);
}); // and get

module.exports = router;
