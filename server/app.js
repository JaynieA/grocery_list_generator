var PORT = process.env.PORT || 8181;
var express = require('express');
var app = express();

//middleware
app.use(express.static('public'));

app.listen(PORT, function() {
  console.log('server listening on', PORT);
}); // end app listen

//routers
var ingredient = require( '../routers/ingredient' );
app.use('/ingredient', ingredient);
