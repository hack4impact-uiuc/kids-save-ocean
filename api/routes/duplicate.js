const express = require("express");
const router = express.Router();

const { checkToken } = require("../auth/utils/checkToken");

router.post("/:model_ID", function(req, res) {
  const db = req.db;
  const collection = db.get("projects");
  const { model_ID } = req.params;

  collection.findOne(
    {
      _id: model_ID
    },
    {
      $exists: true
    },
    function(e, docs) {
      delete docs['_id'];
      collection.insert(docs);
      res.json({ success: "Model was duplicated!" });
    }
  );
});

module.exports = router;
