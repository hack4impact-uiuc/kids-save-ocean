const express = require("express");
const router = express.Router();

router.get("/sample", function(req, res) {
  const db = req.db;
  const collection = db.get("sample");
  collection.find({}, {}, function(e, docs) {
    res.send(docs);
  });
});

router.get("/", function(req, res) {
  res.send("Kids Save Ocean");
});

module.exports = router;
