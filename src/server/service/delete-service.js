const mongoose = require('mongoose');
const Image = mongoose.model('images');
const fs = require('fs');
const path = require('path');

function startDelete(data) {
	return new Promise((resolve, reject) => {
		promiseResolve = resolve;
		promiseReject = reject;

		// find all files in db
		Image.find({},
			(err, findResult) => {
				if (err) {
					reject(err);
				} else {
					for (var i = 0; i < findResult.length; i++) {
						item = findResult[i];
						Image.findByIdAndRemove(findResult[i]._id,
							(err, removedObj) => { 
								if (err) {
									// todo
								} else {
									// delete images
									fs.unlinkSync(IMAGE_DIR + `\\${removedObj.fileName}`);
									fs.unlinkSync(IMAGE_DIR + `\\${removedObj.smFileName}`);
									fs.unlinkSync(IMAGE_DIR + `\\${removedObj.mdFileName}`);
									fs.unlinkSync(IMAGE_DIR + `\\${removedObj.lgFileName}`);
								}
							}
						);
					}
				}
			}
		);
	});
}

exports.start = startDelete;