const dotenv = require("dotenv").config();

if (dotenv.error) {
  throw dotenv.error;
}

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const logger = require("winston");

const apiVersion = process.env.API_VERSION;
const router = require(`./routes/${apiVersion}`);

logger.add(new logger.transports.File({ filename: "combined.log" }));

if (process.env.NODE_ENV === "development") {
  logger.add(new logger.transports.Console());
}

const app = express();
app.disable("x-powered-by");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(`/api/${apiVersion}`, router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
const port = process.env.PORT || 3000;
app.use(errorHandler());
app.set("port", port);
app.listen(app.get("port"), () => {
  logger.info(`Express server listening on port ${port}`);
});

module.exports = app;
