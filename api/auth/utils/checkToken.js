const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove "Bearer " from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.decoded = decoded;
      req.user = {
        email: decoded.sub,
        role: decoded.permission
      };
      if (next) {
        next();
      } else {
        res.json({
          success: true,
          message: "Token valid!"
        });
      }
    });
  } else {
    return res.sendStatus(403);
  }
  return false;
};

router.get("/checkToken", function(req, res) {
  checkToken(req, res);
});

module.exports = {
  checkToken: checkToken,
  router
};
