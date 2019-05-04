const { Router } = require("express");
const { inject } = require("awilix-express");
const Status = require("http-status");

const DirectoriesController = {
  get router() {
    const router = Router();

    router.use(inject("directorySerializer"));

    router.get("/", inject("getAllDirectories"), this.index);
    router.get("/:id", inject("getDirectory"), this.show);
    router.post("/", inject("createDirectory"), this.create);
    router.put("/:id", inject("updateDirectory"), this.update);
    router.delete("/:id", inject("deleteDirectory"), this.delete);

    return router;
  },

  index(req, res, next) {
    const { getAllDirectories, directorySerializer } = req;
    const { SUCCESS, ERROR } = getAllDirectories.outputs;

    getAllDirectories
      .on(SUCCESS, users => {
        res.status(Status.OK).json(users.map(directorySerializer.serialize));
      })
      .on(ERROR, next);

    getAllDirectories.execute();
  },

  show(req, res, next) {
    const { getDirectory, directorySerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getDirectory.outputs;

    getDirectory
      .on(SUCCESS, user => {
        res.status(Status.OK).json(directorySerializer.serialize(user));
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(ERROR, next);

    getDirectory.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const { createDirectory, directorySerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createDirectory.outputs;

    createDirectory
      .on(SUCCESS, user => {
        res.status(Status.CREATED).json(directorySerializer.serialize(user));
      })
      .on(VALIDATION_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          type: "ValidationError",
          details: error.details
        });
      })
      .on(ERROR, next);

    createDirectory.execute(req.body, req.user.id);
  },

  update(req, res, next) {
    const { updateDirectory, directorySerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = updateDirectory.outputs;
    updateDirectory
      .on(SUCCESS, user => {
        res.status(Status.ACCEPTED).json(directorySerializer.serialize(user));
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

    updateDirectory.execute(Number(req.params.id), req.body, req.user.id);
  },

  delete(req, res, next) {
    const { deleteDirectory } = req;
    const { SUCCESS, ERROR, NOT_FOUND } = deleteDirectory.outputs;

    deleteDirectory
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

    deleteDirectory.execute(Number(req.params.id));
  }
};

module.exports = DirectoriesController;
