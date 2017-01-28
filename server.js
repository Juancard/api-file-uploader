'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var multer  = require('multer')
var upload = multer();
// para ver headers http (agregado por mi, no viene en el clementine)
var logger = require("morgan");

//var flash = require('connect-flash');
var bodyParser   = require('body-parser');

var app = express();
require('dotenv').load();

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

//http headers on console
app.use(logger("dev")); // probar tambien con "combine"

//app.use(flash()); // use connect-flash for flash messages stored in session
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Data to send to Routes files
var appEnv = {
  path: process.cwd(),
  upload
}

routes(app, appEnv);

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
});
