const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const TokenController = {
  get router() {
    const router = Router();

    router.post('/', inject('postToken'), this.login);

    return router;
  },

  login(req, res, next) {
    const { postToken } = req;
    const { SUCCESS, ERROR } = postToken.outputs;

    postToken
      .on(SUCCESS, data => {
        res
          .status(Status.OK)
          .json(data);
      })
      .on(ERROR, next);

    postToken.execute(req.body);
  }

};

module.exports = TokenController;
