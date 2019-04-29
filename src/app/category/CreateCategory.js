const Operation = require("src/app/Operation");
const Category = require("src/domain/category/Category");

class CreateCategory extends Operation {
  constructor({ categoriesRepository }) {
    super();
    this.categoriesRepository = categoriesRepository;
  }

  async execute(bodyData, currentUserId) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const data = {
      ...bodyData,
      createdBy: currentUserId,
      updatedBy: currentUserId
    };
    const instance = new Category(data);
    try {
      const newInstance = await this.categoriesRepository.add(instance);
      this.emit(SUCCESS, newInstance);
    } catch (error) {
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

CreateCategory.setOutputs(["SUCCESS", "ERROR", "VALIDATION_ERROR"]);

module.exports = CreateCategory;
