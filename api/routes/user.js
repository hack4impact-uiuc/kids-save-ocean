const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;
// const guard = require("express-jwt-permissions");
const { checkToken } = require("../auth/utils/checkToken");

const UserSchema = require("../public/schema/userSchema.js").userSchema;
const SUCCESS = 200;
const NOT_FOUND = 404;

router.get("/", checkToken, (req, res) => {
  // const { db } = req;
  const { role } = req.user;
  if (role === "admin") {
    res.status(SUCCESS).send({
      code: SUCCESS,
      success: true,
      message: "admin"
    });
  } else {
    res.status(NOT_FOUND).send({
      code: NOT_FOUND,
      success: false,
      message: "not admin"
    });
  }
});

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

router.get("/userInfo", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { email } = req.user;
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
  const { email } = req.user;
  const { username, password, country, birthday, anon } = req.body;

  let fieldsToUpdate = {};
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
      { email },
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

//get user's followed projects
router.get("/:id/followingProjects", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { id } = req.params;
  try {
    const user = await collection.findOne({ _id: id });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found."
      });
    }
    res.status(200).send({
      success: true,
      message: "Successfully retrived user's followingProjects.",
      data: user.followingProjects
    });
  } catch (err) {
    return err;
  }
});

// follow a project
router.put("/:id/followingProjects", checkToken, async (req, res) => {
  const { db } = req;
  const userCollection = db.get("users");
  const projCollection = db.get("projects");
  const { id } = req.params;
  const { followingProjects } = req.body;
  try {
    const project = await projCollection.findOne({ _id: followingProjects });
    if (!project) {
      res.status(NOT_FOUND).send({
        success: false,
        message: "Project not found."
      });
    }
    const user = await userCollection.findOne({ _id: id });
    if (!user) {
      res.status(NOT_FOUND).send({
        success: false,
        message: "User not found."
      });
    }
    await userCollection.update(
      { _id: id },
      { $push: { followingProjects } },
      { new: true }
    );
    await projCollection.update(
      { _id: followingProjects },
      { $push: { followers: id } },
      { new: true }
    );
    res.status(SUCCESS).send({
      code: SUCCESS,
      success: true,
      message: `Successfully started following project ${followingProjects}.`
    });
  } catch (err) {
    return err;
  }
});

// unfollow a project
router.delete("/:userId/followingProjects/:projId", async (req, res) => {
  const { db } = req;
  const userCollection = db.get("users");
  const projCollection = db.get("projects");
  const { userId, projId } = req.params;
  try {
    const user = await userCollection.findOne({ _id: userId });
    if (!user) {
      res.status(NOT_FOUND).send({
        success: false,
        message: "User not found."
      });
    }
    const project = await projCollection.findOne({ _id: projId });
    if (!project) {
      res.status(NOT_FOUND).send({
        success: false,
        message: "Project not found."
      });
    }
    await userCollection.update(
      { _id: userId },
      { $pull: { followingProjects: projId } },
      { new: true }
    );
    await projCollection.update(
      { _id: projId },
      { $pull: { followers: userId } },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: `Successfully unfollowed project ${projId}`
    });
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
