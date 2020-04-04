const express = require("express");
const router = express.Router();

router.post("/comment", function(req, res) {
  const { model_ID, phaseName, stageName, userId, comment } = req.body;
  const db = req.db;
  const collection = db.get("comments");
  const commentLocation = `${model_ID}:${phaseName}:${stageName}`;

  collection.update(
    { commentLocation },
    { $push: {
        comments: {
          authorId : userId,
          content : comment,
          createdAt : new Date().toGMTString(),
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

router.get("/comment/:model_ID/:phaseName/:stageName", function(req, res) {
  const { model_ID, phaseName, stageName } = req.params;
  const db = req.db;
  const collection = db.get("comments");

  collection.find(
    { commentLocation: `${model_ID}:${phaseName}:${stageName}` },
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
