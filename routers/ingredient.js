var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var connection = require('../modules/connection');

//gets all ingredients
router.get('/', function(req, res) {
  //res.send({data: "important data"});
  var ingredients = [];
  pg.connect(connection, function(err, client, done) {
    if (err) {
      //if there was an error, log it
      console.log(err);
    } else {
      var query = client.query('SELECT id, name FROM ingredients ORDER BY name ASC');
      query.on('row', function(row) {
        ingredients.push(row);
      }); // end query response
      query.on('end', function() {
        done();
        res.send({ingredients: ingredients});
      }); // end query
    } // end else
  }); // end pg connect
}); // end get

module.exports = router;
