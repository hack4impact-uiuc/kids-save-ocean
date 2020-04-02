const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.send("Kids Save Ocean");
});

module.exports = router;
