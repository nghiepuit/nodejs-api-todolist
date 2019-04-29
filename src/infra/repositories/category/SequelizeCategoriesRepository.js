const sequelize = require("sequelize");
const CategoryMapper = require("./SequelizeCategoryMapper");

class SequelizeCategoriesRepository {
  constructor({ CategoryModel, ProductModel }) {
    this.CategoryModel = CategoryModel;
    this.ProductModel = ProductModel;
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
      order: [
        ["order", "ASC"],
        [
          {
            model: this.CategoryModel,
            as: "children"
          },
          "order",
          "ASC"
        ]
      ],
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
          ],
          include: [
            {
              model: this.ProductModel,
              as: "products"
            }
          ]
        },
        {
          model: this.ProductModel,
          as: "products"
        }
      ]
    });
    // console.log("list: ", list);
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

  /**
   * categoryOrderNumbers = [ { id: 1, order: 2 }, { id: 2, order: 1 } ]
   */
  async order(body) {
    const transaction = await this.CategoryModel.sequelize.transaction();
    try {
      let error = null;
      const { categoryOrderNumbers } = body;
      for (let i = 0; i < categoryOrderNumbers.length; i++) {
        const item = categoryOrderNumbers[i];
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
        return categoryOrderNumbers;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  validate(category) {
    const { valid, errors } = category.validate();
    if (!valid) {
      const error = new Error("ValidationError");
      error.details = errors;
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
