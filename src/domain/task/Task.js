const { attributes } = require("structure");

const Task = attributes({
  id: String,
  title: String,
  description: {
    type: String,
    empty: true,
    nullable: true
  },
  status: Number,
  order: Number,
  createdAt: Date,
  updatedAt: Date
})(
  class Task {
  }
);

module.exports = Task;
