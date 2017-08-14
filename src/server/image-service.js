const axios = require("axios");
const mongoose = require('mongoose');
const Image = mongoose.model('images');

const downloadService = require('./download-service');
const resizeService = require('./resize-service');

function start() {

	return new Promise((resolve, reject) => {
		// request image list
		axios.get("http://54.152.221.29/images.json")
		.then( response => {
			// After requesting the list, download and resize images
			downloadAndResize(response).then( processedImages => {
				// Finally, persist in db
				for (var i = 0; i < processedImages.length; i++) {
					persistImage(processedImages[i]);
				}

				resolve();
			});
		})
		.catch( err=> {
			reject();
		});
	});
}

function downloadAndResize(extServiceRes) {
	return new Promise((resolve, reject) => {
		downloadService.start(extServiceRes.data.images).then(downloadRes => {
			resizeService.start(downloadRes.success).then(importRes => {
				resolve(importRes);
			});
		});
	});

}

function persistImage(imageData) {
	var newImage = new Image(imageData);

	newImage.save(
		(err, dbResult) => {
			if (err) {
				// console.log('do something');
			} else {
				// console.log(dbResult);
			}
		}
	);
}

exports.start = start;
