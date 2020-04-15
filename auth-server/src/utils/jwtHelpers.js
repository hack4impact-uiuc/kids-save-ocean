const jwt = require("jsonwebtoken");

function signAuthJWT(email, role) {
  if (!email || !role) {
    throw "Cannot create hash without email and role!";
  }
  return jwt.sign({ sub: email, permission: role }, process.env.AUTH_SECRET, {
    expiresIn: "1d"
  });
}

// Return true if the JWT is valid and matches the parameters
function verifyAuthJWT(token, userEmail) {
  try {
    let { email } = jwt.verify(token, process.env.AUTH_SECRET);
    if (String(userEmail) === String(email)) {
      return true;
    }
  } catch (err) {
    console.log("Token was updated");
  }
  return false;
}

function shouldUpdateJWT(token, id, password) {
  try {
    let { userId, hashedPassword } = jwt.verify(token, process.env.AUTH_SECRET);
    if (String(userId) === String(id) && hashedPassword == password) {
      return false;
    }
    return false;
  } catch (err) {
    if (process.env.AUTH_SECRET.length > 1) {
      let { userId, hashedPassword } = jwt.verify(
        token,
        String(process.env.AUTH_SECRET[1])
      );
      return String(userId) === String(id) && hashedPassword == password;
    }
    return false;
  }
}

// Returns the auth JWT if it's valid, else return null if it's invalid
function decryptAuthJWT(token) {
  try {
    const { userId } = jwt.verify(token, process.env.AUTH_SECRET);
    return userId;
  } catch (err) {
    if (process.env.AUTH_SECRET.length > 1) {
      try {
        const { userId } = jwt.verify(
          token,
          String(process.env.AUTH_SECRET[1])
        );
        return userId;
      } catch (err) {
        return null;
      }
    }
    return null;
  }
}

module.exports = {
  signAuthJWT,
  verifyAuthJWT,
  decryptAuthJWT,
  shouldUpdateJWT
};
