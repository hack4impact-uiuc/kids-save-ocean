const express = require("express");
const router = express.Router();
var validate = require('express-jsonschema').validate;

router.get("/sample", function(req, res) {
  const db = req.db;
  const collection = db.get("sample");
  collection.find({}, {}, function(e, docs) {
    res.send(docs);
  });
});

router.get("/", function(req, res) {
  res.send("Kids Save Ocean");
});

var ModelSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true
    },
    sdg: {
      type: 'number',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    stages: {
      type: 'object',
      patternProperties: {
        ".*": {
          type: 'object',
          properties: {
            stakeholders: {
              type: 'array',
              items: {type: 'string'}
            },
            challenges: {
              type: 'array',
              items: {type: 'string'}
            },
            insights: {
              type: 'array',
              items: {type: 'string'}
            },
            description: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};

router.post('/model', validate({body: ModelSchema}), function(req, res, next) {
  res.send(req.body);
});

module.exports = router;
