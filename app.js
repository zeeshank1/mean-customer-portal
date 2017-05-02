const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');//To parse POST payload params
const session    = require('express-session');
const routes     = require('./routes/index');
const mysql      = require('mysql');
require('./config/server');

var app = express();

//Adding middle layer to express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'frontend')));//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use('/', routes);//Meaning this all abpve middleware should work on any route, also you can specific a particular route for a middle layer function signature(<DummyName>,<location>)

app.use(function(err,req, res, next) {
	console.error(err);//logs the actual error instead of a same error msg for different errors.
    // var err = new Error('Not Found');
    // err.status = 404;
    next(err);
});

app.listen(4000, function() {
    console.log('............Server is connected on PORT : 4000');//app.listen(8080) on the other hand listens for connections at port 8080.
});
module.exports = app;