const SERVER_URL = require("./../utils/globalServerUrl");
const router = require("express").Router();
const { sendResponse } = require("./../utils/sendResponse");

router.post("/verifyEmail", async function(req, res) {
  const results = await fetch("http://localhost:8000/verifyEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: req.headers.token
    },
    body: JSON.stringify({
      pin: req.body.pin
    })
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
