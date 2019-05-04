const Operation = require("src/app/Operation");

class GetAllDirectories extends Operation {
  constructor({ directoriesRepository }) {
    super();
    this.directoriesRepository = directoriesRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const list = await this.directoriesRepository.getAll({
        attributes: [
          "id",
          "parent",
          "name",
          "createdBy",
          "updatedBy",
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

GetAllDirectories.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllDirectories;
