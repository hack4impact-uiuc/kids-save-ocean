const fetch = require("isomorphic-fetch");
const router = require("express").Router();
const { sendResponse } = require("./../utils/sendResponse");
const { SERVER_URL } = require("./../utils/globalServerUrl");

router.post("/login", async function (req, res) {
  const results = await fetch(`${SERVER_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: req.body.email,
      password: req.body.password,
    }),
  });

  const resp = await results.json();
  if (!resp.token) {
    sendResponse(res, 400, resp.message);
  } else {
    sendResponse(res, 200, resp.message, {
      token: resp.token,
    });
  }
});

module.exports = router;
