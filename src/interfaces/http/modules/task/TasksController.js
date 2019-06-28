const { Router } = require("express");
const { inject } = require("awilix-express");
const Status = require("http-status");

const TasksController = {
  get router() {
    const router = Router();

    router.use(inject("taskSerializer"));

    router.get("/", inject("getAllTasks"), this.index);
    router.get("/:id", inject("getTask"), this.show);
    router.post("/", inject("createTask"), this.create);
    router.put("/:id", inject("updateTask"), this.update);
    router.delete("/:id", inject("deleteTask"), this.delete);
    router.post("/order", inject("orderTask"), this.order);

    return router;
  },

  index(req, res, next) {
    const { getAllTasks, taskSerializer } = req;
    const { SUCCESS, ERROR } = getAllTasks.outputs;

    getAllTasks
      .on(SUCCESS, list => {
        res.status(Status.OK).json(list.map(taskSerializer.serialize));
      })
      .on(ERROR, next);

    getAllTasks.execute();
  },

  show(req, res, next) {
    const { getTask, taskSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getTask.outputs;

    getTask
      .on(SUCCESS, data => {
        res.status(Status.OK).json(taskSerializer.serialize(data));
      })
      .on(NOT_FOUND, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          details: error.details
        });
      })
      .on(ERROR, next);

    getTask.execute(req.params.id);
  },

  create(req, res, next) {
    const { createTask, taskSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createTask.outputs;

    createTask
      .on(SUCCESS, data => {
        res.status(Status.CREATED).json(taskSerializer.serialize(data));
      })
      .on(VALIDATION_ERROR, error => {
        res.status(Status.BAD_REQUEST).json({
          type: "ValidationError",
          details: error.details
        });
      })
      .on(ERROR, next);

    createTask.execute(req.body);
  },

  update(req, res, next) {
    const { updateTask, taskSerializer } = req;
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = updateTask.outputs;
    updateTask
      .on(SUCCESS, data => {
        res.status(Status.ACCEPTED).json(taskSerializer.serialize(data));
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

    updateTask.execute(req.params.id, req.body);
  },

  delete(req, res, next) {
    const { deleteTask } = req;
    const { SUCCESS, ERROR, NOT_FOUND } = deleteTask.outputs;

    deleteTask
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

    deleteTask.execute(req.params.id);
  },
  order(req, res, next) {
    const { orderTask } = req;
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = orderTask.outputs;
    orderTask
      .on(SUCCESS, data => {
        res.status(Status.ACCEPTED).json(data);
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

    orderTask.execute(req.body);
  }
};

module.exports = TasksController;
