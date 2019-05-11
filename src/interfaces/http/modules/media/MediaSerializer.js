const MediaSerializer = {
  serialize({
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
  }) {
    return {
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
    };
  }
};

module.exports = MediaSerializer;
