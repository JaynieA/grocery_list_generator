var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );
var connection = require('../modules/connection');

//get all sections
router.get('/', function(req, res) {
  //res.send(true);
  var sections = [];
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      var query = client.query('SELECT name AS section FROM store_section');
      query.on('row', function(row) {
        //push results into the sections array
        sections.push(row);
      }); // end on query
      query.on('end', function() {
        //disconnect from the database
        done();
        //send sections array to client
        res.send({sections: sections});
      }); // end query end
    } // end else
  }); // end pg connect
}); // end get

module.exports = router;
