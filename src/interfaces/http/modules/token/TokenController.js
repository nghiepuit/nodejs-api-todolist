const { Router } = require("express");
const { inject } = require("awilix-express");
const Status = require("http-status");

const TokenController = {
  get router() {
    const router = Router();

    router.post("/token", inject("postToken"), this.handleLogin);
    router.post("/register", inject("register"), this.handleRegister);

    return router;
  },

  handleLogin(req, res, next) {
    const { postToken } = req;
    const {
      SUCCESS,
      ERROR,
      EMAIL_NOT_EXIST,
      WRONG_PASSWORD
    } = postToken.outputs;

    postToken
      .on(SUCCESS, data => {
        // attach current user into request for update created/updated by
        const { user, token } = data;
        req.user = user;
        res.status(Status.OK).json(token);
      })
      .on(EMAIL_NOT_EXIST, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          message: "Email is not exist!",
          details: error
        });
      })
      .on(WRONG_PASSWORD, error => {
        res.status(Status.NOT_FOUND).json({
          type: "NotFoundError",
          message: "Wrong password!",
          details: error
        });
      })
      .on(ERROR, next);

    postToken.execute(req.body);
  },

  handleRegister(req, res, next) {
    const { register } = req;
    const { SUCCESS, ERROR } = register.outputs;

    register
      .on(SUCCESS, data => {
        res.status(Status.OK).json(data);
      })
      .on(ERROR, next);

    const { email, password } = req.body;
    register.execute(email, password);
  }
};

module.exports = TokenController;
