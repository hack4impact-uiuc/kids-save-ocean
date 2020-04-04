const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;

const UserSchema = require("../public/schema/userSchema.js").userSchema;

router.get("/", async (req, res) => {
  //   const { db } = req;
  //   const collection = db.get("users");
  //   const users = await collection.find({});
  const users = await UserSchema.find({});
  res.json({
    code: 200,
    success: true,
    message: "Users retrieved successfully.",
    data: users
  });
});

router.get("/:id", async (req, res) => {
  //   const { db } = req;
  //   const collection = db.get("users");
  //   const user = await collection.findById(id);
  const { id } = req.params;
  const user = await UserSchema.findById(id);
  const ret = user
    ? {
        code: 200,
        success: true,
        message: "User retrieved successfully.",
        data: user
      }
    : {
        code: 404,
        success: false,
        message: "User not found."
      };
  res.json(ret);
});

router.post("/", validate({ body: userSchema }), async (req, res) => {
  //   const { db } = req;
  //   const collection = db.get("users");
  const { email, username, password, country, birthday, role, anon } = req.body;
  if (!email) {
    res.json({
      code: 404,
      success: false,
      message: "Email is required."
    });
  }
  if (!username) {
    res.json({
      code: 404,
      success: false,
      message: "Username is required."
    });
  }
  if (!password) {
    res.json({
      code: 404,
      success: false,
      message: "Password is required."
    });
  }
  if (!country) {
    res.json({
      code: 404,
      success: false,
      message: "Country is required."
    });
  }
  if (!birthday) {
    res.json({
      code: 404,
      success: false,
      message: "Birthday is required."
    });
  }
  if (!role) {
    res.json({
      code: 404,
      success: false,
      message: "Role is required."
    });
  }
  const newUser = new UserSchema({
    email,
    username,
    password,
    country,
    birthday,
    role,
    anon
  });

  // collection.insert()
  const newUserData = await newUser.save();
  res.json({
    code: 200,
    success: true,
    message: "User successfully created.",
    data: newUserData
  });
});

router.put("/:id", validate({ body: UserSchema }), async (req, res) => {
  //   const { db } = req;
  //   const collection = db.get("users");
  const { id } = req.params;
  const { email, username, password, country, birthday, role, anon } = req.body;
  let fieldsToUpdate = [];
  if (email) {
    fieldsToUpdate["email"] = email;
  }
  if (username) {
    fieldsToUpdate["username"] = username;
  }
  if (password) {
    fieldsToUpdate["password"] = password;
  }
  if (country) {
    fieldsToUpdate["country"] = country;
  }
  if (birthday) {
    fieldsToUpdate["birthday"] = birthday;
  }
  if (role) {
    fieldsToUpdate["role"] = role;
  }
  if (anon) {
    fieldsToUpdate["anon"] = anon;
  }
  const user = await UserSchema.findByIdAndUpdate(
    id,
    { $set: fieldsToUpdate },
    { new: true }
  );
  const ret = user
    ? {
        code: 200,
        success: true,
        message: "User successfully updated.",
        data: user
      }
    : {
        code: 404,
        success: false,
        message: "User not found."
      };
  res.json(ret);
});

router.delete("/:id", async (req, res) => {
  //   const { db } = req;
  //   const collection = db.get("users");
  const { id } = req.params;
  const user = await UserSchema.findByIdAndRemove(id);
  const ret = user
    ? {
        code: 200,
        success: true,
        message: "User successfully deleted."
      }
    : {
        code: 404,
        success: false,
        message: "User not found."
      };
  res.json(ret);
});
