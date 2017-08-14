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

function downloadImage() {
	var url = imageDataList[imageIndex] ? imageDataList[imageIndex].url : null;
	
	axios({
		method:'get',
		url: url,
		responseType:'stream'
	})
	.then( response => {
		var fileName = url.substr(url.lastIndexOf("/") + 1);
		var filePath = IMAGE_DIR + `\\${fileName}`;
		response.data.pipe(fs.createWriteStream(filePath));

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

function downloadNext() {
	imageIndex++;

	if (imageDataList[imageIndex]) {
		downloadImage();
	} else {
		if (downloadStatus.success.length === 0) {
			promiseReject(downloadStatus);
		} else {
			promiseResolve(downloadStatus);
		}
	}
}

exports.start = startDownload;
