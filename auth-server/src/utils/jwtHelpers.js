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
    if (!email) {
      return false;
    }
    if (String(userEmail) === String(email)) {
      return true;
    }
  } catch (err) {
    console.log("Invalid token.");
  }
  return false;
}

function shouldUpdateJWT(token, email, role) {
  try {
    let { userEmail, userRole } = jwt.verify(token, process.env.AUTH_SECRET);
    if (String(userEmail) === String(email) && userRole === role) {
      return false;
    }
    return true;
  } catch (err) {
    return err;
  }
  // } catch (err) {
  //   if (process.env.AUTH_SECRET.length > 1) {
  //     let { userId, hashedPassword } = jwt.verify(
  //       token,
  //       String(process.env.AUTH_SECRET[1])
  //     );
  //     return String(userId) === String(id) && hashedPassword == password;
  //   }
  //   return false;
  // }
}

// Returns the auth JWT if it's valid, else return null if it's invalid
function decryptAuthJWT(token) {
  try {
    const { email } = jwt.verify(token, process.env.AUTH_SECRET);
    return email;
  } catch (err) {
    return err;
  }
}

module.exports = {
  signAuthJWT,
  verifyAuthJWT,
  decryptAuthJWT,
  shouldUpdateJWT
};
