const { Router } = require("express");
const { inject } = require("awilix-express");
const Status = require("http-status");
const multer = require("multer");
const upload = multer({ dest: "/tmp/" });

const MediaController = {
  get router() {
    const router = Router();

    router.use(inject("mediaSerializer"));

    router.get("/", inject("getAllMedia"), this.index);
    router.get("/:id", inject("getMedia"), this.show);
    router.post(
      "/:directoryId",
      upload.array("files"),
      inject("createMedia"),
      this.create
    );
    router.put("/:id", inject("updateMedia"), this.update);
    router.delete("/:id", inject("deleteMedia"), this.delete);

    return router;
  },

  index(req, res, next) {
    const { getAllMedia, mediaSerializer } = req;
    const { SUCCESS, ERROR } = getAllMedia.outputs;

    getAllMedia
      .on(SUCCESS, list => {
        const result = list.map(mediaSerializer.serialize);
        res.status(Status.OK).json(result);
      })
      .on(ERROR, next);

    getAllMedia.execute();
  },

  show(req, res, next) {
    const { getMedia, mediaSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getMedia.outputs;

    getMedia
      .on(SUCCESS, data => {
        res.status(Status.OK).json(mediaSerializer.serialize(data));
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(ERROR, next);

    getMedia.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const { createMedia } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createMedia.outputs;

    createMedia
      .on(SUCCESS, data => {
        res.status(Status.CREATED).json(data);
      })
      .on(VALIDATION_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          type: "ValidationError",
          details: error.details
        });
      })
      .on(ERROR, next);

    createMedia.execute(Number(req.params.directoryId), req.files, req.user.id);
  },

  update(req, res, next) {
    const { updateMedia, mediaSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = updateMedia.outputs;
    updateMedia
      .on(SUCCESS, data => {
        res.status(Status.ACCEPTED).json(mediaSerializer.serialize(data));
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

    updateMedia.execute(Number(req.params.id), req.body, req.user.id);
  },

  delete(req, res, next) {
    const { deleteMedia } = req;
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      CHILDREN_EXISTING
    } = deleteMedia.outputs;

    deleteMedia
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(CHILDREN_EXISTING, error => {
        res.status(Status.BAD_REQUEST).json({
          type: "ChildrenExisting",
          details: error
        });
      })
      .on(ERROR, next);

    deleteMedia.execute(Number(req.params.id));
  }
};

module.exports = MediaController;
