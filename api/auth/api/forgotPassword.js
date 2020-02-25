const fetch = require("isomorphic-fetch");
const { SERVER_URL } = require("./../utils/globalServerUrl");
const router = require("express").Router();

router.post("/forgotPassword", async function(req, res) {
  const results = await fetch(`${SERVER_URL}/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: req.body.email,
      answer: req.body.answer
    })
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
