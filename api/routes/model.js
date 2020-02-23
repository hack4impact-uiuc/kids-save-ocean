const express = require("express");
const router = express.Router();
const validate = require("express-jsonschema").validate;

const ModelSchema = {
  id: "/ModelSchema",
  type: "object",
  properties: {
    name: {
      type: "string",
      required: true
    },
    sdg: {
      type: "array",
      items: {
        type: "integer"
      },
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    stages: {
      type: "object",
      patternProperties: {
        ".*": {
          type: "object",
          properties: {
            stakeholders: {
              type: "array",
              items: {
                type: "string"
              }
            },
            challenges: {
              type: "array",
              items: {
                type: "string"
              }
            },
            insights: {
              type: "array",
              items: {
                type: "string"
              }
            },
            description: {
              type: "string"
            }
          }
        }
      }
    }
  }
};

router.get("/", function (req, res) {
  const db = req.db;
  const collection = db.get("modelCollection");
  collection.find({}, {}, function (e, docs) {
    res.send(docs);
  });
});

router.get("/:model_ID", function (req, res) {
  const db = req.db;
  let id = req.params.model_ID;
  const collection = db.get("modelCollection");
  collection.find({
      _id: id
    }, {
      $exists: true
    },
    function (e, docs) {
      if (docs) {
        res.send(docs);
      } else {
        res.sendStatus(400);
      }
    }
  );
});
//GET models by SDG
router.get("/sdg/:sdg_num", function (req, res) {
  const db = req.db;
  let sdg_num = parseInt(req.params.sdg_num);
  if (isNaN(sdg_num)) {
    res.sendStatus(400);
  }
  const collection = db.get("modelCollection");
  collection.find({
      sdg: sdg_num
    }, {
      $exists: true
    },
    function (e, docs) {
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
  function (req, res, next) {
    const db = req.db;
    const collection = db.get("modelCollection");
    const data = req.body;

    // Check if data includes proper fields
    collection.insert(data, function (err, obj) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json({
          success: data.name + " added!"
        });
      }
    });
  }
);

router.delete("/:model_ID", function (req, res) {
  const db = req.db;
  let id = req.params.model_ID;
  const collection = db.get("modelCollection");
  collection.find({
      _id: id
    }, {
      $exists: true
    },
    function (e, docs) {
      if (docs) {
        collection.remove({
            _id: id
          },
          function (err, obj) {}
        );
        res.json({
          success: id + " deleted!"
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
  function (req, res) {
    const db = req.db;
    let id = req.params.model_ID;
    const collection = db.get("modelCollection");
    collection.find({
        _id: id
      }, {
        $exists: true
      },
      function (e, docs) {
        if (docs) {
          collection.update({
            _id: id
          }, {
            $set: req.body
          });
          res.json({
            success: id + " updated!"
          });
        } else {
          res.sendStatus(400);
        }
      }
    );
  }
);

module.exports = router;