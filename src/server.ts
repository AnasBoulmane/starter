import errorHandler from "errorhandler";

import appModule from "./app.module";

const { expressApp } = appModule;

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
      .then((success) => console.log(success))
      .catch((err) => console.error(err));
  });

export default appModule;
