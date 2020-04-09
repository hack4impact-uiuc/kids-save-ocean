const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;

const CommentSchema = require("../public/schema/commentSchema.js").commentSchema;
const ThreadSchema = require("../public/schema/commentSchema.js").threadSchema;

router.post("/", validate({ body: CommentSchema }), function(req, res) {
  const { commentLocation, userId, comment } = req.body;
  const db = req.db;
  const collection = db.get("comments");

  collection.update(
    { commentLocation },
    { $push: {
        comments: {
          authorId : userId,
          content : comment,
          createdAt : new Date().toGMTString(),
          thread: [],
        }
      }
    },
    {
      upsert: true
    },
    function(err) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json({
          success: `comment added!`
        });
      }
  });
});

router.post("/thread", validate({ body: ThreadSchema }), function(req, res) {
  const { commentLocation, commentIndex, userId, comment } = req.body;
  const db = req.db;
  const collection = db.get("comments");

  collection.update(
    { commentLocation },
    { $push: {
        [`comments.${commentIndex}.thread`]: {
          authorId : userId,
          content : comment,
          createdAt : new Date().toGMTString()
        }
      }
    },
    {
      upsert: true
    },
    function(err) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json({
          success: `comment added!`
        });
      }
  });
});

router.get("/:commentLocation", function(req, res) {
  const { commentLocation } = req.params;
  const db = req.db;
  const collection = db.get("comments");

  collection.find(
    { commentLocation },
    {
      $exists: true
    },
    function(e, docs) {
    if (e) {
      res.sendStatus(500);
    } else {
      res.json({
        comments: docs,
      });
    }
  });
});

module.exports = router;
