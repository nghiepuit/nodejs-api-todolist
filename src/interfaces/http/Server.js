const express = require('express');

class Server {
  constructor({ config, router, logger, auth }) {
    this.config = config;
    this.logger = logger;
    this.express = express();

    this.express.disable('x-powered-by');
    // init passport here.
    this.express.use(auth.initialize());
    this.express.use(router);
  }

  start() {
    return new Promise(resolve => {
      const http = this.express.listen(this.config.web.port, () => {
        const { port } = http.address();
        this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
        resolve();
      });
    });
  }
}

module.exports = Server;
