const Operation = require("src/app/Operation");
const Directory = require("src/domain/directory/Directory");

class CreateDirectory extends Operation {
  constructor({ directoriesRepository }) {
    super();
    this.directoriesRepository = directoriesRepository;
  }

  async execute(bodyData, currentUserId) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const data = {
      ...bodyData,
      createdBy: currentUserId,
      updatedBy: currentUserId
    };
    const instance = new Directory(data);
    try {
      const newInstance = await this.directoriesRepository.add(instance);
      this.emit(SUCCESS, newInstance);
    } catch (error) {
      if (error.message === "ValidationError") {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

CreateDirectory.setOutputs(["SUCCESS", "ERROR", "VALIDATION_ERROR"]);

module.exports = CreateDirectory;
