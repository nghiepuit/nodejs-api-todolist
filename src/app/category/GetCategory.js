const Operation = require("src/app/Operation");

class GetCategory extends Operation {
  constructor({ categoriesRepository }) {
    super();
    this.categoriesRepository = categoriesRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const data = await this.categoriesRepository.getById(id);
      this.emit(SUCCESS, data);
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetCategory.setOutputs(["SUCCESS", "ERROR", "NOT_FOUND"]);

module.exports = GetCategory;
