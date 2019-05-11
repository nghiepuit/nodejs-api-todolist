const Operation = require("src/app/Operation");

class DeleteMedia extends Operation {
  constructor({ mediaRepository }) {
    super();
    this.mediaRepository = mediaRepository;
  }

  async execute(id) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.mediaRepository.remove(id);
      this.emit(SUCCESS);
    } catch (error) {
      if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }
}

DeleteMedia.setOutputs(["SUCCESS", "ERROR", "NOT_FOUND"]);

module.exports = DeleteMedia;
