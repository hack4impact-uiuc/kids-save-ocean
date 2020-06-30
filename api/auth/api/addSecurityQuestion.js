const fetch = require("isomorphic-fetch");
const router = require("express").Router();
const { SERVER_URL } = require("./../utils/globalServerUrl");

router.post("/addSecurityQuestionAnswer", async function (req, res) {
  const results = await fetch(`${SERVER_URL}/addSecurityQuestionAnswer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: req.headers.token,
    },
    body: JSON.stringify({
      questionIdx: req.body.questionIdx,
      answer: req.body.answer,
      password: req.body.password,
    }),
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
