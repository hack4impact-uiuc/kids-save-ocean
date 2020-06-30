const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;

const { checkToken } = require("../auth/utils/checkToken");
const UpvoteSchema = require("../public/schema/upvoteSchema.js").upvoteSchema;

const { getUsername } = require("../utils/user_utils");

router.post(
  "/",
  validate({ body: UpvoteSchema }),
  checkToken,
  async (req, res) => {
    const db = req.db;
    const { upvoteLocation } = req.body;
    const userEmail = req.decoded.sub;
    const username = await getUsername(db, userEmail);
    const upvotes = db.get("upvotes");

    const doc = await upvotes.update(
      { upvoteLocation },
      {
        $set: {
          [`upvotes.${username}`]: {
            upvote: true,
          },
        },
      },
      {
        upsert: true,
      },
      function (err) {
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
            _id: upvoteLocation,
          },
          {
            $inc: { numUpvotes: 1 },
          }
        )
        .catch(() => res.sendStatus(500));
    }

    res.json({
      success: `upvote added!`,
    });
  }
);

router.get("/:upvoteLocation", (req, res) => {
  const { upvoteLocation } = req.params;
  const db = req.db;
  const collection = db.get("upvotes");

  collection.find(
    { upvoteLocation },
    {
      $exists: true,
    },
    function (e, docs) {
      if (e) {
        res.sendStatus(500);
      } else {
        if (docs.length === 0) {
          res.json({ upvotes: 0 });
        } else {
          const { upvotes } = docs[0];
          res.json({
            upvotes: Object.keys(upvotes).length,
          });
        }
      }
    }
  );
});

module.exports = router;
