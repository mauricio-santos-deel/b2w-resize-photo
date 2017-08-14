module.exports = function(app) {
	var controller = require('./controller');

	// API Route to consume a URL
	app.route('/api/images/')
		.get(controller.getImages)
		.post(controller.initImages)
		.delete(controller.deleteAllImageInfo);
};
