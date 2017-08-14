const fs = require('fs');
const gm = require('gm');
const path = require('path');

// Store information about the resize process
let imageIndex;
let downloadedImages;
let resizeOutput;
let smallSize = {
	preffix: 'sm',
	w: 320,
	h: 240,
	next: {
		// medium size
		preffix: 'md',
		w: 384,
		h: 288,
		next: {
			// large size
			preffix: 'lg',
			w: 640,
			h: 480
		}
	}
};

// Store promise cbs
let promiseResolve;
let promiseReject;

function startResize(successDownloadList) {
	imageIndex = 0;
	downloadedImages = successDownloadList;

	// prepare image resize output
	resizeOutput = downloadedImages.slice();
	for (var i = 0; i < resizeOutput.length; i++) {
		delete resizeOutput[i].filePath;
	}

	return new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;

		resizeImages(smallSize);
	});
}

function resizeImages(size) {
	var imageName = downloadedImages[imageIndex].fileName;
	var resizedName = downloadedImages[imageIndex].fileName.replace(".", `_${size.preffix}.`);
	var resizedPath = IMAGE_DIR + `\\${resizedName}`;

	gm(IMAGE_DIR + `\\${imageName}`)
	.resize(size.w, size.h)
	.write(resizedPath , err => {
		if (!err) {
			resizeOutput[imageIndex][size.preffix + "FileName"] = resizedName;
		}

		if (size.next) {
			resizeImages(size.next);
		} else {
			resizeNext();
		}
	});
}

function resizeNext() {
	imageIndex++;

	if (downloadedImages[imageIndex]) {
		resizeImages(smallSize);
	} else {
		promiseResolve(resizeOutput);
	}
}

exports.start = startResize;
