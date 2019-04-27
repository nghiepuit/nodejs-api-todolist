const UserSerializer = {
  serialize({ id, email }) {
    return {
      id,
      email
    };
  }
};

module.exports = UserSerializer;
