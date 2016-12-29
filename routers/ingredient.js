var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );
var connection = require('../modules/connection');

//middleware
//urlEncodedBodyParser = app.use(bodyParser.urlencoded(extended:false));

router.get('/', function(req, res) {
  res.send({data: "important data"});
}); // end get

module.exports = router;
