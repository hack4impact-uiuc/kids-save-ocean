const createError = require("http-errors");
const cors = require("cors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const modelRouter = require("./routes/model");
const filestoreRouter = require("./routes/filestore");
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
const mongo = require('mongodb');
const Grid = require('gridfs-stream');

const DATABASE_NAME = 'kids-save-ocean';
const db = monk(`localhost:27017/${DATABASE_NAME}`);
let gfs;
mongo.MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
  if (err) {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
  }
  gfs = Grid(database.db(DATABASE_NAME), mongo);
});

app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use("/auth/", authRouter);
app.use("/", indexRouter);
app.use("/models", modelRouter);

app.use(function(req, res, next) {
  req.gfs = gfs;
  next();
});

app.use("/upload", filestoreRouter);

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
