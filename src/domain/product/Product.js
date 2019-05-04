const { attributes } = require("structure");

const Product = attributes({
  id: String,
  name: String,
  slug: String,
  status: Boolean,
  description: String,
  hot: Boolean,
  sale: Boolean,
  new: Boolean,
  createdBy: String,
  updatedBy: String,
  createdAt: Date,
  updatedAt: Date
})(
  class Product {
  }
);

module.exports = Product;
