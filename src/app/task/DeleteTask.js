const Operation = require("src/app/Operation");

class DeleteTask extends Operation {
  constructor({ tasksRepository }) {
    super();
    this.tasksRepository = tasksRepository;
  }

  async execute(id) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.tasksRepository.remove(id);
      this.emit(SUCCESS);
    } catch (error) {
      if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteTask.setOutputs(["SUCCESS", "ERROR", "NOT_FOUND"]);

module.exports = DeleteTask;
