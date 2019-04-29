const Operation = require("src/app/Operation");

class OrderCategory extends Operation {
  constructor({ categoriesRepository }) {
    super();
    this.categoriesRepository = categoriesRepository;
  }

  async execute(bodyData, currentUserId) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const data = {
        ...bodyData,
        updatedBy: currentUserId
      };
      const responseData = await this.categoriesRepository.order(data);
      if (responseData.message && responseData.message === "NotFoundError") {
        return this.emit(NOT_FOUND, responseData);
      } else {
        this.emit(SUCCESS, responseData);
      }
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

OrderCategory.setOutputs(["SUCCESS", "NOT_FOUND", "VALIDATION_ERROR", "ERROR"]);

module.exports = OrderCategory;
