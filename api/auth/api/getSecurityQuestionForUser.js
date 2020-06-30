const fetch = require("isomorphic-fetch");
const { SERVER_URL } = require("./../utils/globalServerUrl");
const router = require("express").Router();

router.post("/securityQuestionForUser", async function (req, res) {
  const results = await fetch(`${SERVER_URL}/securityQuestionForUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: req.body.email,
    }),
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
