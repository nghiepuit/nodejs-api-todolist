const CategoryMapper = require("./SequelizeCategoryMapper");

class SequelizeCategoriesRepository {
  constructor({ CategoryModel }) {
    this.CategoryModel = CategoryModel;
  }

  async findOne(...args) {
    const data = await this.CategoryModel.findOne(...args);
    let entity = null;
    if (data) {
      entity = CategoryMapper.toEntity(data);
    }
    return entity;
  }

  async getAll(...args) {
    const list = await this.CategoryModel.findAll({
      ...args,
      where: {
        parent: null
      },
      include: [
        {
          model: this.CategoryModel,
          as: "children",
          attributes: [
            "id",
            "parent",
            "name",
            "slug",
            "isDeleted",
            "status",
            "image",
            "order",
            "createdBy",
            "updatedBy",
            "createdAt",
            "updatedAt"
          ]
        }
      ]
    });
    return list.map(CategoryMapper.toEntity);
  }

  async getById(id) {
    const data = await this._getById(id);
    return CategoryMapper.toEntity(data);
  }

  async add(data) {
    const { valid, errors } = data.validate();

    if (!valid) {
      const error = new Error("ValidationError");
      error.details = errors;

      throw error;
    }
    const newItem = await this.CategoryModel.create(
      CategoryMapper.toDatabase(data)
    );
    return CategoryMapper.toEntity(newItem);
  }

  async remove(id) {
    const data = await this._getById(id);
    await data.destroy();
    return;
  }

  async update(id, newData) {
    const data = await this._getById(id);
    const transaction = await this.CategoryModel.sequelize.transaction();

    try {
      const updatedData = await data.update(newData, { transaction });
      const entity = CategoryMapper.toEntity(updatedData);

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

  async count() {
    return await this.CategoryModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.CategoryModel.findById(id, {
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

module.exports = SequelizeCategoriesRepository;
