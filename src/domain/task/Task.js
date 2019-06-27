const { attributes } = require("structure");

const Task = attributes({
  id: String,
  title: String,
  description: String,
  status: Number,
  order: Number,
  createdAt: Date,
  updatedAt: Date
})(
  class Task {
  }
);

module.exports = Task;
