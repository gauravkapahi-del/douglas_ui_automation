import winston from "winston";
import path from "path";
import fs from "fs";

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Define custom format for console output
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ level, message, timestamp, pageName, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
    return `${timestamp} [${
      pageName || "global"
    }] ${level}: ${message} ${metaStr}`;
  })
);

// Define custom format for file output
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.json()
);

// Create the logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.splat()
  ),
  defaultMeta: { service: "page-objects" },
  transports: [
    // Write all logs with level 'error' and below to 'error.log'
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
      format: fileFormat,
    }),
    // Write all logs with level 'info' and below to 'combined.log'
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log"),
      format: fileFormat,
    }),
    // Write all logs to console
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
});

// Create a function to get a logger instance for a specific page
export function getPageLogger(pageName: string) {
  return {
    info: (message: string, meta: object = {}) => {
      logger.info(message, { pageName, ...meta });
    },
    error: (message: string, error?: Error | unknown, meta: object = {}) => {
      if (error instanceof Error) {
        logger.error(message, {
          pageName,
          error: error.message,
          stack: error.stack,
          ...meta,
        });
      } else {
        logger.error(message, { pageName, error, ...meta });
      }
    },
    warn: (message: string, meta: object = {}) => {
      logger.warn(message, { pageName, ...meta });
    },
    debug: (message: string, meta: object = {}) => {
      logger.debug(message, { pageName, ...meta });
    },
  };
}

export default logger;
