const Operation = require("src/app/Operation");

class GetDirectory extends Operation {
  constructor({ directoriesRepository }) {
    super();
    this.directoriesRepository = directoriesRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const data = await this.directoriesRepository.getById(id);
      this.emit(SUCCESS, data);
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetDirectory.setOutputs(["SUCCESS", "ERROR", "NOT_FOUND"]);

module.exports = GetDirectory;
