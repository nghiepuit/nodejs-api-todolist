const Category = require("src/domain/category/Category");

const SequelizeCategoryMapper = {
  toEntity({ dataValues }) {
    const {
      id,
      parent,
      name,
      slug,
      isDeleted,
      status,
      image,
      order,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt,
      children
    } = dataValues;
    return new Category({
      id,
      parent,
      name,
      slug,
      isDeleted,
      status,
      image,
      order,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt,
      children
    });
  },

  toDatabase(survivor) {
    const {
      name,
      parent,
      slug,
      isDeleted,
      status,
      image,
      createdBy,
      updatedBy
    } = survivor;
    return {
      name,
      parent,
      slug,
      isDeleted,
      status,
      image,
      createdBy,
      updatedBy
    };
  }
};

module.exports = SequelizeCategoryMapper;
