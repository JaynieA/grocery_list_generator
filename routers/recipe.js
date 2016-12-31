var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var connection = require( '../modules/connection' );

//get all recipe info
router.get('/', function(req, res) {
  var recipes = [];
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      var query = client.query('SELECT * FROM recipes');
      query.on('row', function(row) {
        recipes.push(row);
      }); // end query on
      query.on('end', function() {
        done();
        res.send({recipes: recipes});
      }); // end query
    } // end else
  }); // end pg connect
}); // end get

//get total number of recipes in database
router.get('/count', function(req, res) {
  var count;
  //connect to database
  pg.connect(connection, function(err, client, done) {
    if(err) {
      console.log(err);
    } else {
      var query = client.query('SELECT COUNT(id) FROM recipes');
      query.on('row', function(row) {
        count = row;
      }); // end on query
      query.on('end', function() {
        done();
        res.send(count);
      }); // end query end
    } // end else
  }); // end pg connect
}); // end get

module.exports = router;
