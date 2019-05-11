const MediaMapper = require("./SequelizeMediaMapper");

class SequelizeMediaRepository {
  constructor({ MediaModel }) {
    this.MediaModel = MediaModel;
  }

  async findOne(...args) {
    const data = await this.MediaModel.findOne(...args);
    let entity = null;
    if (data) {
      entity = MediaMapper.toEntity(data);
    }
    return entity;
  }

  async getAll(...args) {
    const list = await this.MediaModel.findAll({
      ...args
    });
    const listEntity = list.map(MediaMapper.toEntity);
    return listEntity;
  }

  async getById(id) {
    const data = await this._getById(id);
    return MediaMapper.toEntity(data);
  }

  async add(data) {
    const { valid, errors } = data.validate();

    if (!valid) {
      const error = new Error("ValidationError");
      error.details = errors;

      throw error;
    }

    let newItem = await this.MediaModel.create({
      ...MediaMapper.toDatabase(data)
    });

    return MediaMapper.toEntity(newItem);
  }

  async remove(id) {
    const data = await this._getById(id);
    await data.destroy();
    return;
  }

  async update(id, newData) {
    const data = await this._getById(id);
    const transaction = await this.MediaModel.sequelize.transaction();

    try {
      const updatedData = await data.update(newData, { transaction });
      const entity = MediaMapper.toEntity(updatedData);

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

  validate(media) {
    const { valid, errors } = media.validate();
    if (!valid) {
      const error = new Error("ValidationError");
      error.details = errors;
      throw error;
    }
  }

  async count() {
    return await this.MediaModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.MediaModel.findById(id, {
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

module.exports = SequelizeMediaRepository;
