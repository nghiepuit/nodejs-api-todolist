const Status = require("http-status");

/* istanbul ignore next */
module.exports = (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const { logger } = req.container.cradle;

  logger.error(err);

  let details = null;
  if (err && err.errors) {
    details = err.errors;
  }

  res.status(Status.INTERNAL_SERVER_ERROR).json({
    type: "InternalServerError",
    message: "The server failed to handle this request",
    details
  });
};
