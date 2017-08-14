const mongoose = require('mongoose');
const Image = mongoose.model('images');

const imageService = require('./service/image-service');

exports.initImages = function(req, res) {
	// run assync
	imageService.start();
	// respond with imageService Status
	res.json({ result: 'Started' });
};

/**
 * function that will be called by the route layer
 * to respond HTTP GET Requests on '/api/images/'.
 * Should respond with the list of images already loaded and resized.
 * @param  {Object} req The HTTP Request
 * @param  {Object} res The HTTP Response
 * @return {void}
 */
exports.getImages = function(req, res) {
	Image.find({},
		(err, dbResult) => {
			if (err) {
				res.send(err);
			} else {
				res.json(dbResult);
			}
		}
	);
};

