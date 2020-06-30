const fetch = require("isomorphic-fetch");
const { SERVER_URL } = require("./../utils/globalServerUrl");
const router = require("express").Router();
const { sendResponse } = require("./../utils/sendResponse");

router.post("/verify", async function (req, res) {
  try {
    const results = await fetch(`${SERVER_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: req.headers.token,
      },
    });
    const parsed = await results.json();
    if (results.status === 200) {
      res.send(parsed);
    } else {
      sendResponse(res, 400, results.message);
    }
  } catch (e) {
    sendResponse(res, 400, e);
  }
});

module.exports = router;
