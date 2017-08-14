const mongoose = require('mongoose');
const Image = mongoose.model('images');
const fs = require('fs');
const path = require('path');

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

/**
 * function that will be called by the route layer
 * to respond HTTP POST Requests on /api/images/
 * Should download images from the given repository and resize them. 
 * @param  {Object} req The HTTP Request
 * @param  {Object} res The HTTP Response
 * @return {void}
 */
exports.deleteAllImageInfo = function(req, res) {
	Image.find({},
		(err, findResult) => {
			if (err) {
				res.send(err);
			} else {
				var item;
				var findResultCopy = findResult.slice();
				
				for (var i = 0; i < findResult.length; i++) {
					item = findResult[i];
					Image.findByIdAndRemove(findResult[i]._id,
						(err, removedObj) => { 
							if (err) {
								// todo
							} else {
								// delete images
								fs.unlink(path.resolve(__dirname, `../../public/${removedObj.fileName}`), unlinkCb);
								fs.unlink(path.resolve(__dirname, `../../public/${removedObj.smFileName}`), unlinkCb);
								fs.unlink(path.resolve(__dirname, `../../public/${removedObj.mdFileName}`), unlinkCb);
								fs.unlink(path.resolve(__dirname, `../../public/${removedObj.lgFileName}`), unlinkCb);
							}
						}
					);
				}

				res.json({ result: 'Success' });
			}
		}
	);
};

function unlinkCb(err) {
	if(err) {
		// console.log('do something');
	}

	// console.log('Finished Unlink');
}
