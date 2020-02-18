const SERVER_URL = require("./../utils/globalServerUrl");
const router = require("express").Router();
const { sendResponse } = require("./../utils/sendResponse");

router.post("/roleschange", async function(req, res) {
  const results = await fetch("http://localhost:8000/rolesChange", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: req.headers.token,
      google: req.headers.google
    },
    body: JSON.stringify({
      userEmail: req.body.userEmail,
      newRole: req.body.newRole,
      password: req.body.password
    })
  });
  const parsed = await results.json();
  res.send(parsed);
});

module.exports = router;
