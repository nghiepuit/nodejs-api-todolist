const TaskSerializer = {
  serialize({ id, title, description, status, order, createdAt, updatedAt }) {
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

module.exports = TaskSerializer;
