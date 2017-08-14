var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SysInfoSchema = new Schema({
  imageProcessStatus: {
    type: String,
    enum: ['NOT_INITIALIZED', 'RUNNING', 'INITALIZED']
  },
  imageProcessProgress: {
    type: String
  }
});

module.exports = mongoose.model('sysInfo', SysInfoSchema);
