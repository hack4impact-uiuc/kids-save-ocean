const express = require('express');
const router = express.Router();
var validate = require('jsonschema').validate;


var ModelSchema = {
    id: '/ModelSchema',
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

  router.get('/', function(req, res, next) {
    const db = req.db;
    const collection = db.get('modelCollection');
    collection.find({},{},function(e,docs){
        res.send(docs);
    });
  });

  router.post('/', function(req, res, next) {
    const db = req.db;
    const collection = db.get('modelCollection');
    const data = req.body;

    // Check if data includes proper fields

    if (data && "title" in data) {
        collection.insert(data, function(err, obj) {});
        res.json({ success: data.title + " added!"});
    } else {
        res.sendStatus(403);
    }
  });

  router.delete('/:model_ID', function (req, res, next) {
    const db = req.db
    let id = req.params.model_ID;
    const collection = db.get('modelCollection');
    collection.find({_id: id}, {$exists: true}, function(e,docs) {
        if (docs) {
            collection.remove({_id: id}, function(err, obj) {});
            res.json({success: id + ' deleted!'});
        } else {
            res.sendStatus(403);
        }
    })
  });
  
  module.exports = router;