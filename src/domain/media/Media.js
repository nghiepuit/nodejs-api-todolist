const { attributes } = require("structure");

const Media = attributes({
  id: Number,
  originalName: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  extension: String,
  src: String,
  directoryId: Number,
  createdBy: String,
  updatedBy: String,
  createdAt: Date,
  updatedAt: Date
})(
  class Media {

  }
);

module.exports = Media;
