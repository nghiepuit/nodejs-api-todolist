const sequelize = require("sequelize");
const Operation = require("src/app/Operation");

class GetAllCategories extends Operation {
  constructor({ categoriesRepository }) {
    super();
    this.categoriesRepository = categoriesRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const list = await this.categoriesRepository.getAll({
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
          "updatedAt",
          [sequelize.fn("COUNT", "product.id"), "ProductCount"]
        ]
      });
      this.emit(SUCCESS, list);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllCategories.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllCategories;
