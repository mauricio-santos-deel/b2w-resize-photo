const path = require('path');
const assert = require('assert');
const fs = require('fs');

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
global.IMAGE_DIR = path.resolve(__dirname, './images');

// Services to be tested
const donwloadService = require('../src/server/service/download-service');
const resizeService = require('../src/server/service/resize-service');


describe('Unit Tests', () => {
    const extServiceResMock = [
		{url: "http://54.152.221.29/images/b737_5.jpg"},
		{url: "http://54.152.221.29/images/b777_5.jpg"},
		{url: "http://54.152.221.29/images/b737_3.jpg"},
		{url: "http://54.152.221.29/images/b777_4.jpg"},
		{url: "http://54.152.221.29/images/b777_3.jpg"},
		{url: "http://54.152.221.29/images/b737_2.jpg"},
		{url: "http://54.152.221.29/images/b777_2.jpg"},
		{url: "http://54.152.221.29/images/b777_1.jpg"},
		{url: "http://54.152.221.29/images/b737_4.jpg"},
		{url: "http://54.152.221.29/images/b737_1.jpg"}
	];

	var downloadData;

	describe('download service', () => {
		it('Download external images', (done) => {
			donwloadService.start(extServiceResMock)
			.then( res => {
				assert.equal(res.success.length, 10);
				assert.equal(res.error.length, 0);
				downloadData = res.success;
				done();
			})
			.catch( err => {
				console.log(err);
			});
		});
	});

	var resizeData;

	describe('resize service', () => {
		it('Resize images', (done) => {
			resizeService.start(downloadData)
			.then( res => {
				assert.equal(res.length, 10);
				
				for (var i = 0; i < res.length; i++) {
					assert(res[i].originURL);
					assert(res[i].fileName);
					assert(res[i].smFileName);
					assert(res[i].mdFileName);
					assert(res[i].lgFileName);
				}
				
				resizeData = res;
				done();
			})
			.catch( err => {
				console.log(err);
			});
		});
	});

	// delete all created files
	after(function() {
		for (var i = 0; i < resizeData.length; i++) {
			item = resizeData[i];
			fs.unlinkSync(IMAGE_DIR + `\\${item.fileName}`);
			fs.unlinkSync(IMAGE_DIR + `\\${item.smFileName}`);
			fs.unlinkSync(IMAGE_DIR + `\\${item.mdFileName}`);
			fs.unlinkSync(IMAGE_DIR + `\\${item.lgFileName}`);
		}
	});
});