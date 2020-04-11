const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;

const UpvoteSchema = require("../public/schema/upvoteSchema.js").upvoteSchema;

router.post("/", validate({ body: UpvoteSchema }), (req, res) => {
  const { userId, upvoteLocation } = req.body;
  const db = req.db;
  const collection = db.get("upvotes");

  collection.update(
    { upvoteLocation },
    {
      $set: {
        [`upvotes.${userId}`]: {
          upvote: true
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
          success: `upvote added!`
        });
      }
    }
  );
});

router.get("/:upvoteLocation", (req, res) => {
  const { upvoteLocation } = req.params;
  const db = req.db;
  const collection = db.get("upvotes");

  collection.find(
    { upvoteLocation },
    {
      $exists: true
    },
    function(e, docs) {
      if (e) {
        res.sendStatus(500);
      } else {
        const { upvotes } = docs[0];
        res.json({
          upvotes: Object.keys(upvotes).length
        });
      }
    }
  );
});

module.exports = router;
