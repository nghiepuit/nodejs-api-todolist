const Operation = require("src/app/Operation");

class DeleteCategory extends Operation {
  constructor({ categoriesRepository }) {
    super();
    this.categoriesRepository = categoriesRepository;
  }

  async execute(id) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.categoriesRepository.remove(id);
      this.emit(SUCCESS);
    } catch (error) {
      if (error.message === "NotFoundError") {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteCategory.setOutputs(["SUCCESS", "ERROR", "NOT_FOUND"]);

module.exports = DeleteCategory;
