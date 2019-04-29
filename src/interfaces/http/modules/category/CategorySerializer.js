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
    children,
    productCount
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
      children,
      productCount
    };
  }
};

module.exports = CategorySerializer;
