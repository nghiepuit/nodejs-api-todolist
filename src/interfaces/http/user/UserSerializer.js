const UserSerializer = {
  serialize({
    id,
    firstName,
    lastName,
    middleName,
    email,
    password,
    isDeleted,
    createdBy
  }) {
    return {
      id,
      firstName,
      lastName,
      middleName,
      email,
      password,
      isDeleted,
      createdBy
    };
  }
};

module.exports = UserSerializer;
