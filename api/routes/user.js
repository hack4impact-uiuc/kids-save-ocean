const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;
const { checkToken } = require("../auth/utils/checkToken");

const UserSchema = require("../public/schema/userSchema.js").userSchema;
const SUCCESS = 200;
const NOT_FOUND = 404;

router.get("/", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  try {
    const users = await collection.find({});
    res.status(SUCCESS).send({
      code: SUCCESS,
      success: true,
      message: "Users retrieved successfully.",
      data: users
    });
  } catch (err) {
    return err;
  }
});

router.get("/:id", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { id } = req.params;
  try {
    const users = await collection.find({ _id: id });
    const ret =
      users.length === 1
        ? {
            code: SUCCESS,
            success: true,
            message: "User retrieved successfully.",
            data: users[0]
          }
        : {
            code: NOT_FOUND,
            success: false,
            message: "User not found."
          };
    res.status(ret.code).send(ret);
  } catch (err) {
    return err;
  }
});

router.post("/", validate({ body: UserSchema }), async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { email, username, password, country, birthday, role } = req.body;
  let { anon } = req.body;
  if (!email) {
    res.status(NOT_FOUND).send({
      code: NOT_FOUND,
      success: false,
      message: "Email is required."
    });
  } else if (!username) {
    res.status(NOT_FOUND).send({
      code: NOT_FOUND,
      success: false,
      message: "Username is required."
    });
  } else if (!password) {
    res.status(NOT_FOUND).send({
      code: NOT_FOUND,
      success: false,
      message: "Password is required."
    });
  } else if (!country) {
    res.status(NOT_FOUND).send({
      code: NOT_FOUND,
      success: false,
      message: "Country is required."
    });
  } else if (!birthday) {
    res.status(NOT_FOUND).send({
      code: NOT_FOUND,
      success: false,
      message: "Birthday is required."
    });
  } else if (!role) {
    res.status(NOT_FOUND).send({
      code: NOT_FOUND,
      success: false,
      message: "Role is required."
    });
  } else {
    if (!anon) {
      anon = false;
    }
    const newUser = {
      email,
      username,
      password,
      country,
      birthday,
      role,
      anon,
      admin: false,
      createdProjects: []
    };
    try {
      const resp = await collection.insert(newUser);
      res.status(SUCCESS).send({
        code: SUCCESS,
        success: true,
        message: "User successfully created.",
        data: resp
      });
    } catch (err) {
      return err;
    }
  }
});

router.put("/:id", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { id } = req.params;
  const { email, username, password, country, birthday, role, anon } = req.body;
  let fieldsToUpdate = {};
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
  try {
    const user = await collection.update(
      { _id: id },
      { $set: fieldsToUpdate },
      { new: true }
    );
    const ret = user
      ? {
          code: SUCCESS,
          success: true,
          message: "User successfully updated."
        }
      : {
          code: NOT_FOUND,
          success: false,
          message: "User not found."
        };
    res.status(ret.code).send(ret);
  } catch (err) {
    return err;
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { id } = req.params;
  try {
    const user = await collection.remove({ _id: id });
    const ret = user
      ? {
          code: SUCCESS,
          success: true,
          message: "User successfully deleted."
        }
      : {
          code: NOT_FOUND,
          success: false,
          message: "User not found."
        };
    res.status(ret.code).send(ret);
  } catch (err) {
    return err;
  }
});

// testing purposes
router.delete("/", async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  await collection.remove({});
  res.status(SUCCESS).send({
    code: SUCCESS,
    success: true,
    message: "Users successfully deleted."
  });
});

module.exports = router;
