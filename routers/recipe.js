var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var connection = require( '../modules/connection' );

//gets total number of recipes
router.get('/totalNum', function(req, res) {
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      var count;
      var query = client.query('SELECT COUNT(id) FROM recipes');
      query.on('row', function(row) {
        count = row;
      }); // end on query
      query.on('end', function() {
        done();
        res.send(count);
      }); // query end
    } // end else
  }); // end pg connect
}); // end get

module.exports = router;
