const User = require("../models/User");
const { decryptAuthJWT } = require("./jwtHelpers");

async function verifyUser(token) {
  if (!token) {
    return { errorMessage: "Token not provided" };
  }
  const tokenEmail = await decryptAuthJWT(token);
  if (tokenEmail === null) {
    return { errorMessage: "Invalid Token" };
  }
  console.log(tokenEmail);
  const user = await User.findOne({ email: tokenEmail });
  if (!user) {
    return { errorMessage: "User does not exist in the database" };
  }
  return user;
}

module.exports = {
  verifyUser
};
