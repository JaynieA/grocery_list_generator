var express = require( 'express' );
var router = express.Router();
var pg = require( 'pg' );
var connection = require( '../modules/connection' );

//post new recipe ingredients
router.post('/', function(req, res) {
  res.send(req.body);
}); // end post

module.exports = router;
