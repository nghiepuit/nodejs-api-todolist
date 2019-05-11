const Media = require("src/domain/media/Media");

const SequelizeMediaMapper = {
  toEntity({ dataValues }) {
    const {
      id,
      originalName,
      mimetype,
      destination,
      src,
      path,
      size,
      extension,
      directoryId,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt
    } = dataValues;
    return new Media({
      id,
      originalName,
      mimetype,
      destination,
      src,
      path,
      size,
      extension,
      directoryId,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt
    });
  },

  mapChildren(children) {
    if (children && children.length > 0) {
      return children.map(item => {
        return SequelizeMediaMapper.toEntity(item);
      });
    } else {
      return [];
    }
  },

  toDatabase(survivor) {
    const {
      originalName,
      mimetype,
      destination,
      src,
      path,
      size,
      extension,
      directoryId,
      createdBy,
      updatedBy
    } = survivor;
    return {
      originalName,
      mimetype,
      destination,
      src,
      path,
      size,
      extension,
      directoryId,
      createdBy,
      updatedBy
    };
  }
};

module.exports = SequelizeMediaMapper;
