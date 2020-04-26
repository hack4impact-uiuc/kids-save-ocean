const router = require("express").Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const { sendResponse } = require("./../utils/sendResponse");
const { signAuthJWT } = require("../utils/jwtHelpers");
const { getSecurityQuestions } = require("./../utils/getConfigFile");
const { generatePIN } = require("../utils/pinHelpers");
const {
  googleAuth,
  isSecurityQuestionEnabled
} = require("../utils/getConfigFile");
const { sendMail } = require("./../utils/sendMail");
const handleAsyncErrors = require("../utils/errorHandler");

router.post(
  "/register",
  [
    check("email").isEmail(),
    check("password")
      .isString()
      .isLength({ min: 1 }),
    check("role")
      .isString()
      .isLength({ min: 1 })
  ],
  handleAsyncErrors(async function(req, res) {
    // Checks that the request has the required fields (email, password, and role)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid Request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }
    // Ensures the user doesn't already have an account
    if (await User.findOne({ email: String(req.body.email).toLowerCase() })) {
      return sendResponse(res, 400, "User already exists. Please try again.");
    }
    // Encrypts the password and creates the user's data
    const encodedPassword = await bcrypt.hash(req.body.password, 10);
    let userData = {
      email: String(req.body.email).toLowerCase(),
      password: encodedPassword,
      role: req.body.role,
      verified: false,
    };
    // If the security question is enabled, checks that the security question index is valid and that there is an answer
    const securityQuestionEnabled = await isSecurityQuestionEnabled();
    if (securityQuestionEnabled) {
      const securityQuestionsResponse = await getSecurityQuestions();
      if (!securityQuestionsResponse.success) {
        return sendResponse(
          res,
          500,
          "Can not read the security questions from the config file"
        );
      }
      const question = 
        securityQuestionsResponse.securityQuestions[req.body.questionIdx];
      if (!question || !req.body.securityQuestionAnswer) {
        return sendResponse(
          res,
          400,
          "Invalid security question index or answer"
        );
      }
      userData["question"] = question;
      userData[
        "answer"
      ] = req.body.securityQuestionAnswer.toLowerCase().replace(/\s/g, "");
    }

    const user = new User(userData);

    // If gmail is enabled, it sends an email with a generated PIN to verify the user
    const googleEnabled = await googleAuth();
    if (googleEnabled) {
      generatePIN(user);
      user.expiration = 0;
      const body = {
        from: "kso.auth.server@gmail.com",
        to: user.email,
        subject: "New User Verification",
        text:
          "Thanks for signing up! Please enter the following PIN on the new user confirmation page: " +
          user.pin
      };
      try {
        await sendMail(body);
      } catch (e) {
        return sendResponse(
          res,
          500,
          "Email could not be sent despite Gmail being enabled. This is likely due to incorrect Gmail keys set as environment variables. User not added to DB."
        );
      }
    }
    const jwt_token = await signAuthJWT(user.email, user.role);
    await user.save();
    res.status(200).send({
      status: 200,
      message: "User added to auth database successfully!",
      token: jwt_token,
      email: user.email,
      role: user.role
    });
  })
);

module.exports = router;
