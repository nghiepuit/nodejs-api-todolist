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
    updatedAt,
    roles
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
      updatedAt,
      roles
    };
  }
};

module.exports = UserSerializer;
