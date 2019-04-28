const UserSerializer = {
  serialize({
    id,
    firstName,
    lastName,
    middleName,
    email,
    password,
    isDeleted,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt
  }) {
    return {
      id,
      firstName,
      lastName,
      middleName,
      email,
      password,
      isDeleted,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt
    };
  }
};

module.exports = UserSerializer;
