const Operation = require("src/app/Operation");

class GetAllMedia extends Operation {
  constructor({ mediaRepository }) {
    super();
    this.mediaRepository = mediaRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const list = await this.mediaRepository.getAll({
        attributes: [
          "id",
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

GetAllMedia.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllMedia;
