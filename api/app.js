const createError = require("http-errors");
const cors = require("cors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const modelRouter = require("./routes/model");
const templateRouter = require("./routes/template");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const filestoreRouter = require("./routes/filestore");
const authRouter = require("./auth/api/index");
const duplicateRouter = require("./routes/duplicate");
const upvoteRouter = require("./routes/upvote");

require("dotenv").config();

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
const mongo = require("mongodb");
const Grid = require("gridfs-stream");

const DATABASE_NAME = "kids-save-ocean";
const db = monk(process.env.MONGO_DATABASE);
let gfs;
mongo.MongoClient.connect(process.env.MONGO_DATABASE, (err, database) => {
  if (err) {
    console.log(
      "MongoDB Connection Error. Please make sure that MongoDB is running."
    );
    process.exit(1);
  }
  gfs = Grid(database.db(DATABASE_NAME), mongo);
});

app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use("/api/auth/", authRouter);
app.use("/api/models", modelRouter);
app.use("/api/user", userRouter);
app.use("/api/upload", filestoreRouter);
app.use("/api/users", userRouter);
app.use("/api/duplicate", duplicateRouter);
app.use("/api/comment", commentRouter);
app.use("/api/templates", templateRouter);
app.use("/api/upvote", upvoteRouter);

app.use(function(req, res, next) {
  req.gfs = gfs;
  next();
});

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
