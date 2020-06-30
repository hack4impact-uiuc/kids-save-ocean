const fetch = require("isomorphic-fetch");
const { SERVER_URL } = require("./../utils/globalServerUrl");
const router = require("express").Router();

router.post("/verifyEmail", async function (req, res) {
  const results = await fetch(`${SERVER_URL}/verifyEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: req.headers.token,
    },
    body: JSON.stringify({
      pin: req.body.pin,
    }),
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
