const fetch = require("isomorphic-fetch");
const { SERVER_URL } = require("./../utils/globalServerUrl");
const router = require("express").Router();

router.get("/getUser", async function(req, res) {
  const results = await fetch(`${SERVER_URL}/getUser`, {
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
