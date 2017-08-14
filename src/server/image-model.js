var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  originURL: {
    type: String
  },
  fileName: {
    type: String
  },
  smFileName: {
    type: String
  },
  mdFileName: {
    type: String
  },
  lgFileName: {
    type: String
  }
});

module.exports = mongoose.model('images', ImageSchema);
