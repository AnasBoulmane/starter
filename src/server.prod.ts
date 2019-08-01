import errorHandler from "errorhandler";
import cluster = require("cluster");
import os = require("os");

import appModule from "./app.module";

const { expressApp } = appModule;

const numCPUs = os.cpus().length - 1;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker: cluster.Worker, code: number, signal: string) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server

  /**
   * Start Express server.
   */
  appModule
    .bootstrap()
    .then((msg: any) => {
      console.info(msg);

      /**
       * Error Handler. Provides full stack - remove for production
       */
      expressApp.use(errorHandler());

      /**
       * Start Express server.
       */
      appModule.startServers()
        .then((result) => console.log(result))
        .catch((err) => console.error(err));
    });

  console.log(`Worker ${process.pid} started`);
}

export default appModule;
