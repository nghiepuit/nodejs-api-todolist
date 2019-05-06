const Operation = require("src/app/Operation");

class DeleteDirectory extends Operation {
  constructor({ directoriesRepository }) {
    super();
    this.directoriesRepository = directoriesRepository;
  }

  async execute(id) {
    const { SUCCESS, ERROR, NOT_FOUND, CHILDREN_EXISTING } = this.outputs;

    try {
      await this.directoriesRepository.remove(id);
      this.emit(SUCCESS);
    } catch (error) {
      if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      }
      if(error.message.indexOf("Cannot delete or update a parent row") !== -1) {
        return this.emit(CHILDREN_EXISTING, error);
      }
      this.emit(ERROR, error);
    }
  }
}

DeleteDirectory.setOutputs(["SUCCESS", "ERROR", "NOT_FOUND", "CHILDREN_EXISTING"]);

module.exports = DeleteDirectory;
