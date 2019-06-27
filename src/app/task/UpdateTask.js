const Operation = require("src/app/Operation");

class UpdateTask extends Operation {
  constructor({ tasksRepository }) {
    super();
    this.tasksRepository = tasksRepository;
  }

  async execute(id, bodyData) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const data = {
        ...bodyData
      };
      const instance = await this.tasksRepository.update(id, data);
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

UpdateTask.setOutputs(["SUCCESS", "NOT_FOUND", "VALIDATION_ERROR", "ERROR"]);

module.exports = UpdateTask;
