const router = require("express").Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { sendResponse } = require("./../utils/sendResponse");

router.post("/register", async function(req, res) {
  const body = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    questionIdx: req.body.questionIdx,
    answer: req.body.answer
  };
  const results = await fetch("http://localhost:8000/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const resp = await results.json();
  if (!resp.token) {
    sendResponse(res, 400, resp.message);
  } else {
    sendResponse(res, 200, resp.message, {
      token: resp.token,
      userID: resp.uid,
      permission: resp.permission
    });
  }
});

module.exports = router;
