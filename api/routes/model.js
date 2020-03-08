const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;
const schema = require("../public/schema/projectSchema.js");

const ModelSchema = schema.projectSchema;

router.get("/", function(req, res) {
  var sdg_par = req.query.sdg;
  var sdg_num = parseInt(sdg_par);
  const db = req.db;
  const collection = db.get("modelCollection");
  if (sdg_par && !isNaN(sdg_num)) {
    collection.find(
      {
        sdg: sdg_num
      },
      {
        $exists: true
      },
      function(e, docs) {
        res.send(docs);
      }
    );
  } else {
    collection.find({}, {}, function(e, docs) {
      res.send(docs);
    });
  }
});

router.get("/:model_ID", function(req, res) {
  const db = req.db;
  let id = req.params.model_ID;
  const collection = db.get("modelCollection");
  collection.find(
    {
      _id: id
    },
    {
      $exists: true
    },
    function(e, docs) {
      if (docs) {
        res.send(docs);
      } else {
        res.sendStatus(400);
      }
    }
  );
});

// TODO; Check Validate
router.post(
  "/",
  validate({
    body: ModelSchema
  }),
  function(req, res) {
    const db = req.db;
    const collection = db.get("modelCollection");
    const data = req.body;

    // Check if data includes proper fields
    collection.insert(data, function(err) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json({
          // `Hello, ${name}!`
          success: `${data.name} added!`
        });
      }
    });
  }
);

router.delete("/:model_ID", function(req, res) {
  const db = req.db;
  let id = req.params.model_ID;
  const collection = db.get("modelCollection");
  collection.find(
    {
      _id: id
    },
    {
      $exists: true
    },
    function(e, docs) {
      if (docs) {
        collection.remove({
          _id: id
        });
        res.json({
          success: `${id} deleted!`
        });
      } else {
        res.sendStatus(400);
      }
    }
  );
});
router.put(
  "/:model_ID",
  validate({
    body: ModelSchema
  }),
  function(req, res) {
    const db = req.db;
    let id = req.params.model_ID;
    const collection = db.get("modelCollection");
    collection.find(
      {
        _id: id
      },
      {
        $exists: true
      },
      function(e, docs) {
        if (docs) {
          collection.update(
            {
              _id: id
            },
            {
              $set: req.body
            }
          );
          res.json({
            success: `${id} updated!`
          });
        } else {
          res.sendStatus(400);
        }
      }
    );
  }
);

module.exports = router;
