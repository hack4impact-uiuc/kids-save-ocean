const express = require('express');
const router = express.Router();
var validate = require('express-jsonschema').validate;


var ModelSchema = {
    id: '/ModelSchema',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        required: true
      },
      sdg: {
        type: 'array',
        items:{type: 'integer'},
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
  // TODO; Check Validate 
  router.post('/', validate({body: ModelSchema}), function(req, res, next) {
    const db = req.db;
    const collection = db.get('modelCollection');
    const data = req.body;

    // Check if data includes proper fields

    if (data) {
        collection.insert(data, function(err, obj) {});
        res.json({ success: data.name + " added!"});
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
  router.put('/:model_ID',validate({body: ModelSchema}), function(req, res, next) {
    const db = req.db;
    let id = req.params.model_ID;
    const collection = db.get('modelCollection');
    collection.find({_id: id}, {$exists: true}, function(e,docs) {
      if (docs) {
        collection.update({_id:id},{$set: req.body});
        res.json({success: id + ' updated!'})
      } else {
        res.sendStatus(403);
      }
    })
  });
  
  module.exports = router;