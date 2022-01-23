"use strict";
exports.__esModule = true;
const express = require('express');
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 5000;

const passport = require("passport");
const bodyParser = require("body-parser");
	
// CORS
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, Authorization, Content-Type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

//app.use(bodyParser.urlencoded());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());

const routes = require("./routes/routes.js");

/** All routes configured in router file */
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // console.log(err);
  // render the error page
  res.status(500);
  var error = {error : 'No api available here..'}
  res.json(error);
});


app.listen(port, function () {
    console.log("---------------------------------------------------------");
    console.log(" ");
    console.log("Node Server Listening on Port " + port);
    console.log(" ");
    console.log("---------------------------------------------------------");
});
