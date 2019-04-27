const User = require('src/domain/user/User');

const SequelizeUserMapper = {
  toEntity({ dataValues }) {
    const {
      id,
      firstName,
      lastName,
      middleName,
      email,
      password,
      roleId,
      isDeleted,
      createdBy
    } = dataValues;

    return new User({
      id,
      firstName,
      lastName,
      middleName,
      email,
      password,
      roleId,
      isDeleted,
      createdBy
    });
  },

  toDatabase(survivor) {
    const { email } = survivor;
    return { email };
  }
};

module.exports = SequelizeUserMapper;
