const fetch = require("isomorphic-fetch");
const { SERVER_URL } = require("./../utils/globalServerUrl");
const router = require("express").Router();

router.post("/resendVerificationEmail", async function(req, res) {
  const results = await fetch(`${SERVER_URL}/resendVerificationEmail`, {
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
