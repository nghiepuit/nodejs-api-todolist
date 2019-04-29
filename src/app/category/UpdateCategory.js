const Operation = require("src/app/Operation");

class UpdateCategory extends Operation {
  constructor({ categoriesRepository }) {
    super();
    this.categoriesRepository = categoriesRepository;
  }

  async execute(id, bodyData, currentUserId) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const data = {
        ...bodyData,
        updatedBy: currentUserId
      };
      const instance = await this.categoriesRepository.update(id, data);
      this.emit(SUCCESS, instance);
    } catch (error) {
      switch (error.message) {
      case "ValidationError":
        return this.emit(VALIDATION_ERROR, error);
      case "NotFoundError":
        return this.emit(NOT_FOUND, error);
      default:
        this.emit(ERROR, error);
      }
    }
  }
}

UpdateCategory.setOutputs(["SUCCESS", "NOT_FOUND", "VALIDATION_ERROR", "ERROR"]);

module.exports = UpdateCategory;
