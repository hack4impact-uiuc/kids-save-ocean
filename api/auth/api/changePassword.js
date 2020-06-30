const fetch = require("isomorphic-fetch");
const router = require("express").Router();
const { SERVER_URL } = require("./../utils/globalServerUrl");

router.post("/changePassword", async function (req, res) {
  const results = await fetch(`${SERVER_URL}/changePassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: req.headers.token,
    },
    body: JSON.stringify({
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword,
    }),
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
