const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

let checkToken = (req, res) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove "Bearer " from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token not valid!"
        });
      }
      req.decoded = decoded;
      req.user = {
        email: decoded.sub,
        role: decoded.permission
      };
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token not provided!"
    });
  }
  return true;
};

router.get("/checkToken", function(req, res) {
  if (checkToken(req, res)) {
    res.json({
      success: true,
      message: "Token valid!"
    });
  }
});

module.exports = {
  checkToken: checkToken,
  router
};
