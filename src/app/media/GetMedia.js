const Operation = require("src/app/Operation");

class GetMedia extends Operation {
  constructor({ mediaRepository }) {
    super();
    this.mediaRepository = mediaRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const data = await this.mediaRepository.getById(id);
      this.emit(SUCCESS, data);
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetMedia.setOutputs(["SUCCESS", "ERROR", "NOT_FOUND"]);

module.exports = GetMedia;
