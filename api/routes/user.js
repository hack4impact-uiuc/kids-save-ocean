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

router.get("/userInfo", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { email } = req.user;
  console.log(email);
  try {
    const users = await collection.find({ email });
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
  const { email, username, password, country, birthday } = req.body;
  let { anon } = req.body;
  if (!anon) {
    anon = false;
  }
  const newUser = {
    email,
    username,
    password,
    country,
    birthday,
    anon,
    admin: false,
    createdProjects: [],
    followingProjects: [],
    followingUsers: [],
    followers: []
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
});

router.put("/userInfo", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const oldEmail = req.user.email;
  const users = await collection.find({ email: oldEmail });
  const userId = users[0]._id;
  const { email, username, password, country, birthday, anon } = req.body;

  //TODO: change email in auth db and re-sign token

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
  if (anon) {
    fieldsToUpdate["anon"] = anon;
  }
  try {
    const user = await collection.update(
      { _id: userId },
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

router.delete("/userInfo", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { email } = req.user;
  try {
    const user = await collection.remove({ email });
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

//handle following
router.put("/:id/follow", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { id } = req.params;
  const { userToFollow } = req.body;
  try {
    const user = await collection.find({ _id: id })[0];
    if (!user) {
      res.status(NOT_FOUND).send({
        code: NOT_FOUND,
        success: false,
        message: "User not found."
      });
    }
    let cur_following = user.followingUsers;
    cur_following.push(userToFollow);
    try {
      await collection.update(
        { _id: id },
        { $set: { followingUsers: cur_following } },
        { new: true }
      );
      res.status(SUCCESS).send({
        code: SUCCESS,
        success: true,
        message: `Successfully started following user ${userToFollow}.`
      });
    } catch (err) {
      return err;
    }
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
