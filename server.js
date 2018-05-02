// Sets up the Express app to handle data parsing
const express = require("express")
const bodyParser = require("body-parser");
const app = express();

// Set up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Map our routing files
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// Set our listener for Heroku
var port = process.env.PORT || 8081;
app.listen(port, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + port);
});