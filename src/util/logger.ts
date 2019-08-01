import winston from "winston";
import { Logger } from "winston";
import { ENVIRONMENT } from "./secrets";

const logger = new (Logger)({
  transports: [
    new (winston.transports.Console)({level: process.env.NODE_ENV === "production" ? "error" : "debug"}),
    new (winston.transports.File)({filename: "debug.log", level: "debug"}),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export const Console = Object.assign({}, console, ((console) => {
  return {
    log (...args: any[]) {
      logger.info.apply(logger, ["\x1b[32m%s\x1b[0m", ...args]);
    },
    info (...args: any[]) {
      logger.info.apply(logger, ["\x1b[36m%s\x1b[0m", ...args]);
    },
    warn (...args: any[]) {
      if (process.env.NODE_ENV === "production") { return; }
      logger.warn.apply(logger, ["\x1b[33m%s\x1b[0m", ...args]);
    },
    error (...args: any[]) {
      logger.error.apply(logger, ["\x1b[31m%s\x1b[0m", ...args]);
    },
    debug (...args: any[]) {
      if (process.env.NODE_ENV === "production") { return; }
      logger.debug.apply(logger, ["\x1b[32m%s\x1b[0m", ...args]);
    },
  };
})(console));

console.log = Console.log;
console.info = Console.info;
console.warn = Console.warn;
console.error = Console.error;
console.debug = Console.debug;

export default logger;
