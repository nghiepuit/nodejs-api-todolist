const Operation = require("src/app/Operation");
const Task = require("src/domain/task/Task");

class CreateTask extends Operation {
  constructor({ tasksRepository }) {
    super();
    this.tasksRepository = tasksRepository;
  }

  async execute(bodyData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const data = {
      ...bodyData
    };
    const instance = new Task(data);
    try {
      const newInstance = await this.tasksRepository.add(instance);
      this.emit(SUCCESS, newInstance);
    } catch (error) {
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

CreateTask.setOutputs(["SUCCESS", "ERROR", "VALIDATION_ERROR"]);

module.exports = CreateTask;
