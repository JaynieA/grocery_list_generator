var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var bodyParser = require( 'body-parser' );
var connection = require('../modules/connection');

router.get('/', function(req,res) {
  res.send(true);
}); // end get

module.exports = router;
