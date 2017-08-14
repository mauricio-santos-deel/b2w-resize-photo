/**
 * Wrapper JS required on server.js used to load mongoose models.
 */

const Image = require('./image-model');
const SysInfo = require('./sys-info-model');

module.exports = {
	Image,
	SysInfo
};
