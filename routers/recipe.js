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

//get recipe names
router.get('/name', function(req, res) {
  //unpack params and build IN parameters for query
  numRecipes = Number(req.query.totalNum);
  var inParams = '(';
  for (var i = 1; i <= numRecipes; i++) {
    //concatenate id to string
    if (i === numRecipes) {
      // if it's the last one, end with parenthesis:
      inParams += req.query['id'+i] + ')';
    } else {
      //add a comma in prep for the next one added
      inParams += req.query['id'+i] + ', ';
    } // end else
  } // end for
  //Build queryString
  var queryString = 'SELECT id, name FROM recipes WHERE id IN ' + inParams;
  //Define names array
  var names = [];
  pg.connect(connection, function(err, client, done) {
    var query = client.query(queryString);
    query.on('row', function(row) {
      //push recipe names into names array
      names.push(row);
    }); // end on query
    query.on('end', function() {
      done();
      res.send({names: names});
    }); // end query
  }); // end pg connect
}); // end get

router.post('/', function(req, res) {
  //res.send(req.body);
  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      var queryString = 'INSERT INTO recipes (name, servings, reference_url, image_url) VALUES ($1, $2, $3, $4) RETURNING id, name';
      var recipe = req.body;
      var query = client.query(queryString, [recipe.name, recipe.servings, recipe.reference_url, recipe.image_url],
        function(err, result) {
          if (err) {
            res.sendStatus(500);
          } else {
            //Send the id and name of newly created row back to client
            res.send(result.rows[0]);
            //res.sendStatus(201);
          } // end else
      }); // end query
    } // end else
  }); // end pg connect
}); // end post

module.exports = router;
