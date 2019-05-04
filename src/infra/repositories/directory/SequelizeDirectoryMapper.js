const Directory = require("src/domain/directory/Directory");

const SequelizeDirectoryMapper = {
  toEntity({ dataValues }) {
    const {
      id,
      parent,
      name,
      path,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt,
      children
    } = dataValues;
    return new Directory({
      id,
      parent,
      name,
      path,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt,
      children: children ? SequelizeDirectoryMapper.mapChildren(children) : []
    });
  },

  mapChildren(children) {
    if (children && children.length > 0) {
      return children.map(item => {
        return SequelizeDirectoryMapper.toEntity(item);
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

module.exports = SequelizeDirectoryMapper;
