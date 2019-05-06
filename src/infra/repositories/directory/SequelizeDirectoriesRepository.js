const DirectoryMapper = require("./SequelizeDirectoryMapper");
const fs = require("fs");
const path = require("path");

class SequelizeDirectoriesRepository {
  constructor({ DirectoryModel }) {
    this.DirectoryModel = DirectoryModel;
  }

  async findOne(...args) {
    const data = await this.DirectoryModel.findOne(...args);
    let entity = null;
    if (data) {
      entity = DirectoryMapper.toEntity(data);
    }
    return entity;
  }

  async getAll(...args) {
    const list = await this.DirectoryModel.findAll({
      ...args
    });
    const listEntity = list.map(DirectoryMapper.toEntity);
    return listEntity;
  }

  async getById(id) {
    const data = await this._getById(id);
    return DirectoryMapper.toEntity(data);
  }

  async add(data) {
    const { valid, errors } = data.validate();

    if (!valid) {
      const error = new Error("ValidationError");
      error.details = errors;

      throw error;
    }

    let newItem = null;
    try {
      const { name, parent } = data;
      let dir = null;
      let srcPath = null;

      if (parent) {
        await this.getById(parent).then(parentDirectory => {
          srcPath = parentDirectory.path + "/" + name;
          dir = path.resolve(srcPath);
        });
      } else {
        srcPath = "uploads/" + name;
        dir = path.resolve(srcPath);
      }

      newItem = await this.DirectoryModel.create({
        ...DirectoryMapper.toDatabase(data),
        path: srcPath
      });

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (err) {
      throw err;
    }

    return DirectoryMapper.toEntity(newItem);
  }

  async remove(id) {
    const data = await this._getById(id);
    await data.destroy();
    return;
  }

  async update(id, newData) {
    const data = await this._getById(id);
    const transaction = await this.DirectoryModel.sequelize.transaction();

    try {
      const updatedData = await data.update(newData, { transaction });
      const entity = DirectoryMapper.toEntity(updatedData);

      const { valid, errors } = entity.validate();

      if (!valid) {
        const error = new Error("ValidationError");
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return entity;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  validate(directory) {
    const { valid, errors } = directory.validate();
    if (!valid) {
      const error = new Error("ValidationError");
      error.details = errors;
      throw error;
    }
  }

  async count() {
    return await this.DirectoryModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.DirectoryModel.findById(id, {
        rejectOnEmpty: true
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("NotFoundError");
        notFoundError.details = `User with id ${id} can't be found.`;
        throw notFoundError;
      }
      throw error;
    }
  }
}

module.exports = SequelizeDirectoriesRepository;
