// Require dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

// Port configuration for local/Heroku
const PORT = process.env.PORT || 3000;

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
// if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
// }

// Add routes
app.use(routes);

// Set up mongoose
mongoose.Promise = Promise;

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/NYTArticledb");

// var MONGODB_URI = process.env.MONGODB_URI;

// Choose port
// var PORT = 3000;



// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
