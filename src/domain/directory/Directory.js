const { attributes } = require("structure");

const Directory = attributes({
  id: String,
  parent: String,
  name: String,
  path: String,
  createdBy: String,
  updatedBy: String,
  createdAt: Date,
  updatedAt: Date,
  children: Array
})(
  class Directory {

  }
);

module.exports = Directory;
