const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;

const { checkToken } = require("../auth/utils/checkToken");
const { CommentSchema, ThreadSchema } = require("../public/schema/commentSchema");

router.post("/", validate({ body: CommentSchema }), checkToken, function(req, res) {
  const { commentLocation, comment } = req.body;
  const userId = req.decoded.userId;
  const db = req.db;
  const collection = db.get("comments");

  collection.update(
    { commentLocation },
    {
      $push: {
        comments: {
          authorId: userId,
          content: comment,
          createdAt: new Date().toGMTString(),
          thread: []
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
    }
  );
});

router.post("/thread", validate({ body: ThreadSchema }), checkToken, function(req, res) {
  const { commentLocation, commentIndex, comment } = req.body;
  const userId = req.decoded.userId;
  const db = req.db;
  const collection = db.get("comments");

  collection.update(
    { commentLocation },
    {
      $push: {
        [`comments.${commentIndex}.thread`]: {
          authorId: userId,
          content: comment,
          createdAt: new Date().toGMTString()
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
    }
  );
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
        if (docs.length === 0) {
          res.json({ comments: [] });
        } else {
          res.json({ comments: docs[0].comments });
        }
      }
    }
  );
});

module.exports = router;
