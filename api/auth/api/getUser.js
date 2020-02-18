const SERVER_URL = require("./../utils/globalServerUrl");
const router = require("express").Router();
const { sendResponse } = require("./../utils/sendResponse");

router.get("/getUser", async function(req, res) {
  const results = await fetch("http://localhost:8000/getUser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: req.headers.token,
      google: req.headers.google
    }
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
