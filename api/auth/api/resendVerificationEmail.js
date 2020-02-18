const SERVER_URL = require("./../utils/globalServerUrl");
const router = require("express").Router();
const { sendResponse } = require("./../utils/sendResponse");

router.post("/resendVerificationEmail", async function(req, res) {
  const results = await fetch("http://localhost:8000/resendVerificationEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: req.headers.token
    },
    body: JSON.stringify({})
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
