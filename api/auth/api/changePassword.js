const router = require("express").Router();
const { sendResponse } = require("./../utils/sendResponse");

router.post("/changePassword", async function(req, res) {
  const results = await fetch("http://localhost:8000/changePassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: req.headers.token
    },
    body: JSON.stringify({
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword
    })
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
