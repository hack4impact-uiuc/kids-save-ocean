const jwt = require("jsonwebtoken");

function signAuthJWT(id, password, role) {
  if (!password || !id || !role) {
    throw "Cannot create hash without id, password, and role!";
  }
  return jwt.sign(
    { userId: id, hashedPassword: password, permission: role },
    process.env.AUTH_SECRET,
    {
      expiresIn: "1d"
    }
  );
}

// Return true if the JWT is valid and matches the parameters
function verifyAuthJWT(token, id, password) {
  try {
    let { userId, hashedPassword } = jwt.verify(token, process.env.AUTH_SECRET);
    if (String(userId) === String(id) && hashedPassword == password) {
      return true;
    }
  } catch (err) {
    console.log("Token was updated");
  }
  if (process.env.AUTH_SECRET.length > 1) {
    try {
      let { userId, hashedPassword } = jwt.verify(
        token,
        String(process.env.AUTH_SECRET[1])
      );
      if (String(userId) === String(id) && hashedPassword == password) {
        return true;
      }
    } catch (err) {
      return false;
    }
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
