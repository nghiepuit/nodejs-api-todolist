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
      children,
      products
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
      children: SequelizeCategoryMapper.mapChildren(children),
      productCount: products ? products.length : 0
    });
  },

  mapChildren(children) {
    if (children && children.length > 0) {
      return children.map(item => {
        return SequelizeCategoryMapper.toEntity(item)
      });
    } else {
      return [];
    }
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
