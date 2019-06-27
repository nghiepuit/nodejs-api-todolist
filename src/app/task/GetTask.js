const Operation = require("src/app/Operation");

class GetTask extends Operation {
  constructor({ tasksRepository }) {
    super();
    this.tasksRepository = tasksRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const data = await this.tasksRepository.getById(id);
      this.emit(SUCCESS, data);
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetTask.setOutputs(["SUCCESS", "ERROR", "NOT_FOUND"]);

module.exports = GetTask;
