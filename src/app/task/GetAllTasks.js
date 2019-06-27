const Operation = require("src/app/Operation");

class GetAllTasks extends Operation {
  constructor({ tasksRepository }) {
    super();
    this.tasksRepository = tasksRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const list = await this.tasksRepository.getAll({
        attributes: [
          "id",
          "title",
          "description",
          "status",
          "order",
          "createdAt",
          "updatedAt"
        ]
      });
      this.emit(SUCCESS, list);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllTasks.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllTasks;
