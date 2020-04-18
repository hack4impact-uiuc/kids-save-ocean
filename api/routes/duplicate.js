const express = require("express");
const router = express.Router();

const { checkToken } = require("../auth/utils/checkToken");

async function addProjectId(db, modelId, userId) {
  collection = db.get("users");
  await collection.update(
    { _id: userId },
    { $push: { createdProjects: modelId } },
  );
};

async function addReferences(db, srcId, destId) {
  collection = db.get("projects");
  await collection.update(
    { _id: srcId },
    { $push: { referencedBy: destId } },
  );

  await collection.update(
    { _id: destId },
    { $push: { references: srcId } },
  );
};

router.post("/:model_ID", function(req, res) {
  const db = req.db;
  const collection = db.get("projects");
  const { model_ID } = req.params;
  const userId = "5e979579d8ba76f125db29ec";

  collection.findOne(
    {
      _id: model_ID
    },
    {
      $exists: true
    },
    function(err, doc) {
      if (err) {
        res.sendStatus(500);
      } else {
        const oldId = doc['_id'];
        delete doc['_id'];
        delete doc['email'];
        delete doc['phone'];
        delete doc['referencedBy'];
        delete doc['references'];
        collection.insert(doc, async function(err, doc) {
          if (err) {
            res.sendStatus(500);
          } else {
            await addProjectId(db, doc._id, userId);
            await addReferences(db, oldId, doc._id);
            res.json({ success: "Model was duplicated!" });
          }
        });
      }
    }
  );
});

module.exports = router;
