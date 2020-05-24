const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;
const { checkToken } = require("../auth/utils/checkToken");

const UserSchema = require("../public/schema/userSchema.js").userSchema;
const SUCCESS = 200;
const NOT_FOUND = 404;
const DUPLICATE = 409;

router.get("/", checkToken, (req, res) => {
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

router.get("/userInfo", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { email } = req.user;
  try {
    const user = await collection.findOne({ email });
    if (!user) {
      res.status(NOT_FOUND).send({
        success: false,
        message: "User not found."
      });
    }
    res.status(SUCCESS).send({
      success: true,
      message: "User retrieved successfully.",
      data: user
    });
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
  const { email, username, country, birthday } = req.body;
  let { anon } = req.body;
  if (!anon) {
    anon = false;
  }
  const newUser = {
    email,
    username,
    country,
    birthday,
    anon,
    admin: false,
    createdProjects: [],
    followingProjects: [],
    followingUsers: [],
    followers: [],
    lastCheckedNotifs: Date.now()
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

router.put("/userInfo/notifs", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { email } = req.user;
  const { lastCheckedNotifs } = req.body;

  try {
    const user = await collection.update(
      { email },
      { $set: { lastCheckedNotifs } },
      { new: true }
    );
    if (user) {
      res.status(200).send({
        success: true,
        message: "Updated last checked user notification date."
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User not found."
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal server error."
    });
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
router.get("/followingProjects", checkToken, async (req, res) => {
  const { db } = req;
  const collection = db.get("users");
  const { email } = req.user;
  try {
    const user = await collection.findOne({ email });
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
router.put("/followingProjects", checkToken, async (req, res) => {
  const { db } = req;
  const userCollection = db.get("users");
  const projCollection = db.get("projects");
  const { email } = req.user;
  const { projId } = req.body;

  // check for duplicate projects
  try {
    const project = await projCollection.findOne({ _id: projId });
    if (!project) {
      return res.status(NOT_FOUND).send({
        success: false,
        message: "Project not found."
      });
    }
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(NOT_FOUND).send({
        success: false,
        message: "User not found."
      });
    }
    if (user.followingProjects.includes(projId)) {
      return res.status(DUPLICATE).send({
        success: false,
        message: "Already following project."
      });
    }
    await userCollection.update(
      { email },
      { $push: { followingProjects: projId } },
      { new: true }
    );
    await projCollection.update(
      { _id: projId },
      { $push: { followers: user._id } },
      { new: true }
    );
    res.status(SUCCESS).send({
      success: true,
      message: `Successfully started following project ${project.name}.`
    });
  } catch (err) {
    return err;
  }
});

// unfollow a project
router.delete("/followingProjects", checkToken, async (req, res) => {
  const { db } = req;
  const userCollection = db.get("users");
  const projCollection = db.get("projects");
  const { email } = req.user;
  const { projId } = req.body;
  try {
    const project = await projCollection.findOne({ _id: projId });
    if (!project) {
      return res.status(NOT_FOUND).send({
        success: false,
        message: "Project not found."
      });
    }
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(NOT_FOUND).send({
        success: false,
        message: "User not found."
      });
    }
    await userCollection.update(
      { email },
      { $pull: { followingProjects: projId } },
      { new: true }
    );
    await projCollection.update(
      { _id: projId },
      { $pull: { followers: user._id } },
      { new: true }
    );
    res.status(SUCCESS).send({
      success: true,
      message: `Successfully unfollowed project ${project.name}.`
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

// add field
router.get("/updates/:numUpdates/:currentIndex", checkToken, async function(
  req,
  res
) {
  const { numUpdates, currentIndex } = req.params;

  const db = req.db;
  const userCollection = db.get("users");
  const email = req.user.email;

  const user = await userCollection.findOne({ email });
  if (!user) {
    res.status(NOT_FOUND).send({
      success: false,
      message: "User not found."
    });
  }

  const projectIds = user.followingProjects;

  const updates = db.get("updates");

  updates.createIndex({ projectId: 1, date: 1 });

  const feedUpdates = await updates.find(
    {
      projectId: { $in: projectIds }
    },
    {
      sort: { date: -1 }
    },
    function(e, docs) {
      if (docs === null) {
        res.sendStatus(404);
      }
    }
  );

  const shouldNotif = feedUpdates.some(
    update => update.date > user.lastCheckedNotifs
  );

  res.status(SUCCESS).send({
    success: true,
    data: {
      shouldNotif,
      updates: feedUpdates.slice(currentIndex, currentIndex + numUpdates)
    }
  });
});

module.exports = router;
