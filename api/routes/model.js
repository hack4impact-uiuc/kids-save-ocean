const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;
const ObjectId = require('mongodb').ObjectID;

const ModelSchema = require("../public/schema/projectSchema.js").projectSchema;
const SaveDescriptionSchema = require("../public/schema/saveDescriptionSchema.js").saveDescriptionSchema;

router.get("/", function(req, res) {
  var sdg_par = req.query.sdg;
  var sdg_num = parseInt(sdg_par);
  const db = req.db;
  const collection = db.get("projects");
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
  const collection = db.get("projects");
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
    const collection = db.get("projects");
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
  const collection = db.get("projects");
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
    const collection = db.get("projects");
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

router.post(
  "/saveDescription",
  validate({
    body: SaveDescriptionSchema
  }),
  function(req, res) {
    const db = req.db;
    const collection = db.get("projects");
    const { id, phaseName, stageName, description } = req.body;
    // assert phaseName in ["inspiration", "ideation", "implementation"]

    // Check if data includes proper fields
    const query = { "_id": new ObjectId(id), [`phases.${phaseName}.stages.name`]: stageName };
    console.log(`phases.${phaseName}.stages.name`);
    collection.update(query,
      {"$set": { [`phases.${phaseName}.stages.$.description`]: description } },
      function(err) {
        if (err) {
          res.sendStatus(500);
        } else {
          res.json({
            success: `${stageName} description updated!`
          });
        }
      }
    );
  }
);

module.exports = router;
