import express, { NextFunction } from "express";
import * as core from "express-serve-static-core";  // compresses requests
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

import { Console } from "./util/logger";

import {
  ComponentScan,
  ExpressBootApplication,
  IExpressApplication,
  Middleware,
} from "@express.ts/stereotype";

import config from "./config/appConfig.json";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });

// Create Express server
@ComponentScan([
  path.join(__dirname, "./services/impl"),
  path.join(__dirname, "./controllers"),
])
@ExpressBootApplication({
  settings: [{
    key: "port", value: process.env.PORT || 3000 }, {
    key: "httpPort", value: process.env.PORT || 3000 }, {
    key: "createForkWorkers", value: true }, {
    key: "views", value: path.join(__dirname, "../views") }, {
    key: "view engine", value: "pug",
  }],
  properties: [
    config,
  ],
  middlewares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }),
  ],
})
export class AppModule implements IExpressApplication {
  public expressApp: core.Express;
  public startServers: () => Promise<any>;
  public bootstrap: () => Promise<any>;

  createConnection () {
    // Connect to MongoDB
    // createConnection()
    //   .then(connection => console.log("Connect to MongoDB: ", connection.isConnected))
    //   .catch(errors => console.log(errors));
  }

  public $OnInit () {
    Console.info(`$OnInit worker ${process.pid}`);
  }

  public $OnReady () {
    Console.info(`$OnReady worker ${process.pid}`);
  }

  @Middleware
  setLocalsUser (req: any, res: any, next: any) {
    res.locals.user = req.user;
    next();
  }
}

export const appModule = new AppModule();

export default appModule;
