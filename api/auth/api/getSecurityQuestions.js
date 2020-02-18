const router = require("express").Router();

router.get("/getSecurityQuestions", async function(req, res) {
  const results = await fetch("http://localhost:8000/getSecurityQuestions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: req.headers.token
    }
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
