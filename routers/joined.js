var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );
var connection = require('../modules/connection');

//get all ingredients for one recipe
router.get('/', function(req,res) {
  //res.send(req.query.id);
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

module.exports = router;
