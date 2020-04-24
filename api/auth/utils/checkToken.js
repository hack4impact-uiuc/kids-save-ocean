const jwt = require("jsonwebtoken");

let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove "Bearer " from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(400);
      }
      req.decoded = decoded;
      req.user = {
        email: decoded.sub,
        role: decoded.permission
      };
      next();
    });
  } else {
    return res.sendStatus(400);
  }
};

module.exports = {
  checkToken: checkToken
};
