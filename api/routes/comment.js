const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;

const { checkToken } = require("../auth/utils/checkToken");
const {
  CommentSchema,
  ThreadSchema
} = require("../public/schema/commentSchema");

const { getUsername } = require("../utils/user_utils");

router.post("/", validate({ body: CommentSchema }), checkToken, async function(
  req,
  res
) {
  const db = req.db;
  const { commentLocation, comment } = req.body;
  const userEmail = req.decoded.sub;
  const username = await getUsername(db, userEmail);
  const comments = db.get("comments");

  const doc = await comments.update(
    { commentLocation },
    {
      $push: {
        comments: {
          authorName: username,
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
      }
    }
  );

  if (doc.nModified) {
    const projects = db.get("projects");
    projects
      .findOneAndUpdate(
        {
          _id: commentLocation
        },
        {
          $inc: { numComments: 1 }
        }
      )
      .catch(() => res.sendStatus(500));
  }

  res.json({
    success: `comment added!`
  });
});

router.post(
  "/thread",
  validate({ body: ThreadSchema }),
  checkToken,
  async function(req, res) {
    const db = req.db;
    const { commentLocation, commentIndex, comment } = req.body;
    const userEmail = req.decoded.sub;
    const username = await getUsername(db, userEmail);
    const comments = db.get("comments");

    const doc = await comments.update(
      { commentLocation },
      {
        $push: {
          [`comments.${commentIndex}.thread`]: {
            authorName: username,
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
        }
      }
    );

    if (doc.nModified) {
      const projects = db.get("projects");
      projects
        .findOneAndUpdate(
          {
            _id: commentLocation
          },
          {
            $inc: { numComments: 1 }
          }
        )
        .catch(() => res.sendStatus(500));
    }

    res.json({
      success: `comment added!`
    });
  }
);

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

router.get("/:commentLocation/count", function(req, res) {
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
          res.json({ comments: 0 });
        } else {
          res.json({ comments: docs[0].comments.length });
        }
      }
    }
  );
});

module.exports = router;
