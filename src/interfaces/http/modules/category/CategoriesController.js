const { Router } = require("express");
const { inject } = require("awilix-express");
const Status = require("http-status");

const CategoriesController = {
  get router() {
    const router = Router();

    router.use(inject("categorySerializer"));

    router.get("/", inject("getAllCategories"), this.index);
    router.get("/:id", inject("getCategory"), this.show);
    router.post("/", inject("createCategory"), this.create);
    router.put("/:id", inject("updateCategory"), this.update);
    router.delete("/:id", inject("deleteCategory"), this.delete);

    return router;
  },

  index(req, res, next) {
    const { getAllCategories, categorySerializer } = req;
    const { SUCCESS, ERROR } = getAllCategories.outputs;

    getAllCategories
      .on(SUCCESS, list => {
        res.status(Status.OK).json(list.map(categorySerializer.serialize));
      })
      .on(ERROR, next);

    getAllCategories.execute();
  },

  show(req, res, next) {
    const { getCategory, categorySerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getCategory.outputs;

    getCategory
      .on(SUCCESS, data => {
        res.status(Status.OK).json(categorySerializer.serialize(data));
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(ERROR, next);

    getCategory.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const { createCategory, categorySerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createCategory.outputs;

    createCategory
      .on(SUCCESS, data => {
        res.status(Status.CREATED).json(categorySerializer.serialize(data));
      })
      .on(VALIDATION_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          type: "ValidationError",
          details: error.details
        });
      })
      .on(ERROR, next);

    createCategory.execute(req.body, req.user.id);
  },

  update(req, res, next) {
    const { updateCategory, categorySerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = updateCategory.outputs;
    updateCategory
      .on(SUCCESS, data => {
        res.status(Status.ACCEPTED).json(categorySerializer.serialize(data));
      })
      .on(VALIDATION_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          type: "ValidationError",
          details: error.details
        });
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(ERROR, next);

    updateCategory.execute(Number(req.params.id), req.body, req.user.id);
  },

  delete(req, res, next) {
    const { deleteCategory } = req;
    const { SUCCESS, ERROR, NOT_FOUND } = deleteCategory.outputs;

    deleteCategory
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(ERROR, next);

    deleteCategory.execute(Number(req.params.id));
  }
};

module.exports = CategoriesController;
