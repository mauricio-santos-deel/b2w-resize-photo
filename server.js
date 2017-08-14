// require needed libs
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// load params
const port = process.env.PORT || 3000;

// Middleware to parse simple request bodies, this will not parse multipart bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set and connect mongoose
mongoose.Promise = global.Promise;
const db = mongoose.connect("mongodb://localhost/b2w-resize-photo", { useMongoClient: true });
// initialize schema
const imageModel = require('./src/server/image-model');

// Set sys API Routes
const routes = require('./src/server/routes');
routes(app);

// Serve static assets
app.use(express.static(__dirname + '/public'))

// All GET routes, that has not /api prefix, will respond with index, as index is a SPA app
app.get('*', function (request, response){
	response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

// Listen
var server = app.listen(port, function () {
	console.log(`The app is running on port: ${port}`);
});

module.exports = app; // for testing