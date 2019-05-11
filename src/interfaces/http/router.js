const { Router } = require("express");
const statusMonitor = require("express-status-monitor");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const methodOverride = require("method-override");
const controller = require("./utils/createControllerRoutes");

module.exports = ({
  config,
  containerMiddleware,
  loggerMiddleware,
  errorHandler,
  swaggerMiddleware,
  auth
}) => {
  const router = Router();

  /* istanbul ignore if */
  if (config.env === "development") {
    router.use(statusMonitor());
  }

  /* istanbul ignore if */
  if (config.env !== "test") {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(methodOverride("X-HTTP-Method-Override"))
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(compression())
    .use(containerMiddleware)
    .use("/docs", swaggerMiddleware);

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  apiRouter.use("/auth", controller("token/TokenController"));
  apiRouter.use(
    "/users",
    auth.hasPermissions([config.permissions.MANAGE_USER]),
    controller("user/UsersController")
  );
  apiRouter.use(
    "/categories",
    auth.hasPermissions([config.permissions.MANAGE_CATEGORY]),
    controller("category/CategoriesController")
  );
  apiRouter.use(
    "/directories",
    auth.hasPermissions([config.permissions.MANAGE_DIRECTORY]),
    controller("directory/DirectoriesController")
  );
  apiRouter.use(
    "/media",
    auth.hasPermissions([config.permissions.MANAGE_DIRECTORY]),
    controller("media/MediaController")
  );

  router.use("/api", apiRouter);
  router.use(errorHandler);

  return router;
};
