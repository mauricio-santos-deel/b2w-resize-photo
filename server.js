// require needed libs
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// load params
const port = process.env.PORT || 3000;
const __TEST__ = process.env.NODE_ENV && process.env.NODE_ENV.replace(/\s/g, '').indexOf("test") > -1 ? true : false;

// Middleware to parse simple request bodies, this will not parse multipart bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Check env and decide which db to use
var dbPath = 'mongodb://localhost/b2w-resize-photo';
dbPath = __TEST__ ? dbPath + '-test' : dbPath;
// Set and connect mongoose
mongoose.Promise = global.Promise;
const db = mongoose.connect(dbPath, { useMongoClient: true });
// initialize schemas
const imageModel = require('./src/server/model/image-model');

// Set sys API Routes
const routes = require('./src/server/routes');
routes(app);

// set global variable to store images dir
if (__TEST__) {
	global.IMAGE_DIR = path.resolve(__dirname, './test/images');
} else {
	global.IMAGE_DIR = path.resolve(__dirname, './public');
}

// Serve static assets
app.use(express.static(__dirname + '/public'))

// All GET routes, that has not /api prefix, will respond with index, as index is a SPA app
app.get('*', function (request, response){
	response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

// Listen
var server = app.listen(port, function () {
	console.log(`The app is running on port: ${port}`);

	const deleteService = require("./src/server/service/delete-service");
	deleteService.start();
});

module.exports = app; // for testing