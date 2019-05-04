const DirectorySerializer = {
  serialize({
    id,
    name,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
    children
  }) {
    return {
      id,
      name,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt,
      children
    };
  }
};

module.exports = DirectorySerializer;
