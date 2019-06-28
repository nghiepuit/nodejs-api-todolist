const Task = require("src/domain/task/Task");

const SequelizeTaskMapper = {
  toEntity({ dataValues }) {
    const {
      id,
      title,
      description,
      status,
      order,
      createdAt,
      updatedAt
    } = dataValues;
    return new Task({
      id,
      title,
      description,
      status,
      order,
      createdAt,
      updatedAt
    });
  },

  toDatabase(survivor) {
    const {
      id,
      title,
      description,
      status,
      order,
      createdAt,
      updatedAt
    } = survivor;
    return {
      id,
      title,
      description,
      status,
      order,
      createdAt,
      updatedAt
    };
  }
};

module.exports = SequelizeTaskMapper;
