const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;

const ModelSchema = require("../public/schema/projectSchema.js").projectSchema;

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

router.post("/:model_ID/:phaseName/:stageName/description", function(req, res) {
  const db = req.db;
  const collection = db.get("projects");
  const { model_ID, phaseName, stageName } = req.params;
  const description = req.body.description;
  if (description === undefined) {
    res.sendStatus(400);
  }

  const query = {
    _id: model_ID,
    [`phases.${phaseName}.stages.name`]: stageName
  };

  collection.update(
    query,
    { $set: { [`phases.${phaseName}.stages.$.description`]: description } },
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
});

router.get("/:model_ID/:phaseName/:stageName/description", function(req, res) {
  const db = req.db;
  const collection = db.get("projects");
  const { model_ID, phaseName, stageName } = req.params;

  collection.findOne(
    {
      _id: model_ID
    },
    {
      $exists: true
    },
    function(e, docs) {
      if (e) {
        res.sendStatus(500);
      } else {
        const stages = docs["phases"][phaseName]["stages"];
        const stage = stages.filter(s => s.name === stageName)[0];
        console.log(stage);
        res.json({
          description: stage.description
        });
      }
    }
  );
});

module.exports = router;
