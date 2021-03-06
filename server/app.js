var PORT = process.env.PORT || 8181;
var express = require('express');
var app = express();
var bodyParser = require( 'body-parser' );

//middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(PORT, function() {
  console.log('server listening on', PORT);
}); // end app listen

//routers
var ingredient = require( '../routers/ingredient' );
app.use('/ingredient', ingredient);

var measurement = require( '../routers/measurement' );
app.use('/measurement', measurement);

var recipe = require( '../routers/recipe' );
app.use('/recipe', recipe);

var joined = require( '../routers/joined' );
app.use('/joined', joined);

var section = require( '../routers/section' );
app.use('/section', section);

var recipe_ingredient = require( '../routers/recipe_ingredient' );
app.use( '/recipe_ingredient', recipe_ingredient );
