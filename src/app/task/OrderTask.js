const Operation = require("src/app/Operation");

class OrderTask extends Operation {
  constructor({ tasksRepository }) {
    super();
    this.tasksRepository = tasksRepository;
  }

  async execute(bodyData) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const data = {
        ...bodyData
      };
      const responseData = await this.tasksRepository.order(data);
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

OrderTask.setOutputs(["SUCCESS", "NOT_FOUND", "VALIDATION_ERROR", "ERROR"]);

module.exports = OrderTask;
