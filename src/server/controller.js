const mongoose = require('mongoose');
const Image = mongoose.model('images');

const imageService = require('./service/image-service');

/**
 * function that will be called by the route layer
 * to respond HTTP POST Requests on '/api/images/'.
 * Should respond with message flaging that image service has started.
 * @param  {Object} req The HTTP Request
 * @param  {Object} res The HTTP Response
 * @return {void}
 */
exports.initImages = function(req, res) {
	// run assync
	imageService.start();
	// respond with imageService Status
	res.json({ result: 'Images service has started, wait 10 seconds until it finished, and then send a GET to /api/images/' });
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

