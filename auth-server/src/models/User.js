const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: "string",
  password: "string",
  email: "string",
  question: "string",
  answer: "string",
  pin: "number",
  verified: "boolean",
  expiration: "date",
  userLevel: "string",
  googleAuth: "boolean",
  role: {
    type: "string",
    enum: ["student", "teacher", "stakeholder", "admin"]
  }
});

const User = mongoose.model("User", schema);

module.exports = User;
