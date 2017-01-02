var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var connection = require( '../modules/connection' );

//post new recipe ingredients
router.post('/', function(req, res) {
  var recipeId = req.body.id;
  var ingredients = req.body.ingredients;

  pg.connect(connection, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    } else {
      //Loop through ingredients array
      for (var i = 0; i < ingredients.length; i++) {
        // console.log(ingredients[i].amount);
        var ingredientId = ingredients[i].ingredientId;
        var measurementId = ingredients[i].measurementId;
        var amount = ingredients[i].amount;
        var queryString = 'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, measurement_id, ingredient_amount) VALUES ($1, $2, $3, $4)';
        //insert each ingredient into the database
        var query = client.query(queryString, [recipeId, ingredientId, measurementId, amount], function(err, response) {
          if (err) {
            res.sendStatus(500);
          } else {
            console.log('OK');
          } // end else
        }); // end query
      } // end for
      done();
      res.sendStatus(201);
    } // end else
  }); // end pg connect
}); // end post

module.exports = router;
