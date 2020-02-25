const createError = require("http-errors");
const cors = require("cors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fetch = require("isomorphic-fetch");

const indexRouter = require("./routes/index");
const authRouter = require("./auth/api/index");


const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const monk = require("monk");
const db = monk("localhost:27017/kids-save-ocean");

app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use("/auth/", authRouter);
app.use("/", indexRouter);
app.use("/models", modelRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
