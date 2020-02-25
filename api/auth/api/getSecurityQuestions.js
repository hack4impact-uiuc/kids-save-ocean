const fetch = require("isomorphic-fetch");
const router = require("express").Router();
const { SERVER_URL } = require("./../utils/globalServerUrl");

router.get("/getSecurityQuestions", async function(req, res) {
  const results = await fetch(`${SERVER_URL}/getSecurityQuestions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: req.headers.token
    }
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
