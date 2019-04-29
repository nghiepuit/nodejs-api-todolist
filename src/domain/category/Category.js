const { attributes } = require("structure");

const Category = attributes({
  id: String,
  parent: String,
  name: String,
  slug: String,
  isDeleted: Number,
  status: Boolean,
  image: String,
  order: Number,
  createdBy: String,
  updatedBy: String,
  createdAt: Date,
  updatedAt: Date,
  children: Array,
  productCount: Number
})(
  class Category {
  }
);

module.exports = Category;
