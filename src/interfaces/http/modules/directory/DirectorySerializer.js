const DirectorySerializer = {
  serialize({
    id,
    name,
    path,
    parent,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
    children
  }) {
    return {
      id,
      name,
      path,
      parent,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt,
      children
    };
  },

  getNestedChildren(arr, parent = "") {
    const out = [];
    for (const i in arr) {
      if (arr[i].parent === parent) {
        const children = this.getNestedChildren(arr, arr[i].id);
        if (children.length) {
          arr[i].children = children;
        }
        const item = {
          ...arr[i]
        };
        out.push(item);
      }
    }
    return out;
  }
};

module.exports = DirectorySerializer;
