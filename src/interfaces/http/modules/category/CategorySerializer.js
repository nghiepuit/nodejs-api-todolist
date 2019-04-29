const CategorySerializer = {
  serialize({
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
  }) {
    return {
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
    };
  }
};

module.exports = CategorySerializer;
