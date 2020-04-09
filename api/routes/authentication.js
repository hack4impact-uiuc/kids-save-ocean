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
        return res.json({
          success: false,
          message: "Token not valid!"
        });
      } else {
        req.decoded = decoded;
        req.user = {
          permissions: decoded.permissions[0]
        };
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token not provided!"
    });
  }
};

module.exports = {
  checkToken: checkToken
};
