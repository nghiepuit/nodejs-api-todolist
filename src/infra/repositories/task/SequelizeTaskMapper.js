const Category = require("src/domain/category/Category");

const SequelizeCategoryMapper = {
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
    return new Category({
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

module.exports = SequelizeCategoryMapper;
