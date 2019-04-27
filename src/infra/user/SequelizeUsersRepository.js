const UserMapper = require("./SequelizeUserMapper");
const { comparePassword } = require("../encryption");

class SequelizeUsersRepository {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  async findOne(...args) {
    const user = await this.UserModel.findOne(...args);
    let entity = null;
    if (user) {
      entity = UserMapper.toEntity(user);
    }
    return entity;
  }

  async getAll(...args) {
    const users = await this.UserModel.findAll(...args);

    return users.map(UserMapper.toEntity);
  }

  async getById(id) {
    const user = await this._getById(id);

    return UserMapper.toEntity(user);
  }

  async register(user) {
    const { valid, errors } = user.validate();

    if (!valid) {
      const error = new Error("ValidationError");
      error.details = errors;
      throw error;
    }

    const newUser = await this.UserModel.create(UserMapper.toDatabase(user));
    return UserMapper.toEntity(newUser);
  }

  async add(user) {
    const { valid, errors } = user.validate();

    if (!valid) {
      const error = new Error("ValidationError");
      error.details = errors;

      throw error;
    }

    const newUser = await this.UserModel.create(UserMapper.toDatabase(user));
    return UserMapper.toEntity(newUser);
  }

  async remove(id) {
    const user = await this._getById(id);

    await user.destroy();
    return;
  }

  async update(id, newData) {
    const user = await this._getById(id);

    const transaction = await this.UserModel.sequelize.transaction();

    try {
      const updatedUser = await user.update(newData, { transaction });
      const userEntity = UserMapper.toEntity(updatedUser);

      const { valid, errors } = userEntity.validate();

      if (!valid) {
        const error = new Error("ValidationError");
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return userEntity;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.UserModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.UserModel.findById(id, { rejectOnEmpty: true });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("NotFoundError");
        notFoundError.details = `User with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }

  validatePassword(endcodedPassword) {
    return password => {
      return comparePassword(password, endcodedPassword);
    };
  }
}

module.exports = SequelizeUsersRepository;
