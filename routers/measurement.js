var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var connection = require( '../modules/connection' );

//gets all measurements
router.get('/', function(req, res) {
  var measurements = [];
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log(err);
    } else {
      var query = client.query('SELECT id, name FROM measurements ORDER BY name ASC');
      query.on('row', function(row) {
        measurements.push(row);
      }); // end on query
      query.on('end', function() {
        done();
        res.send({measurements: measurements});
      }); // end query
    } // end else
  }); // end pg connect
}); // end get

module.exports = router;
