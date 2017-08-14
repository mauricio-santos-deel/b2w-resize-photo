var axios = require("axios");
var fs = require('fs');
const path = require('path');

// Store information about the download process
let imageIndex;
let imageDataList;
let downloadStatus;

// Store promise cbs
let promiseResolve;
let promiseReject;

/**
 * Start download process
 * @param  {Array} data Array of objects containing url parameter that points to images to download.
 * @return {Promise} Will resolve when all files were downloaded
 */
function startDownload(data) {
	imageDataList = data;
	imageIndex = 0;
	downloadStatus = {
		success: [],
		error: []
	};

	return new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;

		downloadImage();
	});
}

/**
 * Download the image in imageIndex position inside imageDataList
 */
function downloadImage() {
	var url = imageDataList[imageIndex] ? imageDataList[imageIndex].url : null;
	
	// request image from external resourse
	axios({
		method:'get',
		url: url,
		responseType:'stream'
	})
	.then( response => {
		// mount file params
		var fileName = url.substr(url.lastIndexOf("/") + 1);
		var filePath = IMAGE_DIR + `\\${fileName}`;

		// save file in directory
		response.data.pipe(fs.createWriteStream(filePath));

		// store success file
		downloadStatus.success.push({
			originURL: url,
			fileName,
			filePath 
		});

		downloadNext();
	})
	.catch( error => {
		downloadStatus.error.push({
			url: url
		});

		downloadNext();
	});
}

/**
 * Download next image inside imageDataList or resolve download service
 * if next possition in array is null or undefined
 */
function downloadNext() {
	imageIndex++;

	if (imageDataList[imageIndex]) {
		// if exists next image, start downloading it
		downloadImage();
	} else {
		if (downloadStatus.success.length === 0) {
			// if no image success, reject
			promiseReject(downloadStatus);
		} else {
			promiseResolve(downloadStatus);
		}
	}
}

exports.start = startDownload;
