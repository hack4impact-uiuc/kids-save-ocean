const express = require("express");
const router = express.Router();

const { checkToken } = require("../auth/utils/checkToken");

const { getUserId } = require("../utils/user_utils");

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

router.post("/:model_ID", checkToken, async function(req, res) {
  const db = req.db;
  const { model_ID } = req.params;
  const userEmail = req.decoded.sub;
  const userId = await getUserId(db, userEmail);
  const collection = db.get("projects");

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
        doc['ownerId'] = userId;
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
