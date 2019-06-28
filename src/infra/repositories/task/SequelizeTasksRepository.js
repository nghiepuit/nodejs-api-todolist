const TaskMapper = require("./SequelizeTaskMapper");

class SequelizeTasksRepository {
  constructor({ TaskModel }) {
    this.TaskModel = TaskModel;
  }

  async findOne(...args) {
    const data = await this.TaskModel.findOne(...args);
    let entity = null;
    if (data) {
      entity = TaskMapper.toEntity(data);
    }
    return entity;
  }

  async getAll(...args) {
    const list = await this.TaskModel.findAll({
      ...args,
      order: [["order", "ASC"]]
    });
    return list.map(TaskMapper.toEntity);
  }

  async getById(id) {
    const data = await this._getById(id);
    return TaskMapper.toEntity(data);
  }

  async add(data) {
    const { valid, errors } = data.validate();

    if (!valid) {
      const error = new Error("ValidationError");
      error.details = errors;

      throw error;
    }
    const newItem = await this.TaskModel.create(TaskMapper.toDatabase(data));
    return TaskMapper.toEntity(newItem);
  }

  async remove(id) {
    const data = await this._getById(id);
    await data.destroy();
    return;
  }

  async update(id, newData) {
    const data = await this._getById(id);
    const transaction = await this.TaskModel.sequelize.transaction();

    try {
      const updatedData = await data.update(newData, { transaction });
      const entity = TaskMapper.toEntity(updatedData);

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

  /**
   * orderNumbers = [ { id: 1, order: 2 }, { id: 2, order: 1 } ]
   */
  async order(body) {
    const transaction = await this.TaskModel.sequelize.transaction();
    try {
      let error = null;
      const { orderNumbers } = body;
      for (let i = 0; i < orderNumbers.length; i++) {
        const item = orderNumbers[i];
        let data = null;
        try {
          data = await this._getById(item.id);
          await data.update({ order: item.order });
        } catch (err) {
          error = err;
          break;
        }
      }
      if (error) {
        throw error;
      } else {
        await transaction.commit();
        return orderNumbers;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  validate(data) {
    const { valid, errors } = data.validate();
    if (!valid) {
      const error = new Error("ValidationError");
      error.details = errors;
      throw error;
    }
  }

  async count() {
    return await this.TaskModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.TaskModel.findById(id, {
        rejectOnEmpty: true
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("NotFoundError");
        notFoundError.details = `Task with id ${id} can't be found.`;
        throw notFoundError;
      }
      throw error;
    }
  }
}

module.exports = SequelizeTasksRepository;
