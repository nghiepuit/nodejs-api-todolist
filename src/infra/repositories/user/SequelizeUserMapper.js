const User = require("src/domain/user/User");

const SequelizeUserMapper = {

  toEntity({ dataValues }) {
    const {
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
    } = dataValues;

    return new User({
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
    });
  },

  toDatabase(survivor) {
    const { email, password } = survivor;
    return { email, password };
  }
};

module.exports = SequelizeUserMapper;
