const fetch = require("isomorphic-fetch");
const { SERVER_URL } = require("./../utils/globalServerUrl");
const router = require("express").Router();

router.post("/google", async function (req, res) {
  const results = await fetch(`${SERVER_URL}/google`, {
    // change this to actual server
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tokenId: req.body.tokenId,
    }),
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
