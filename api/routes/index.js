const express = require('express');
const router = express.Router();
var validate = require('express-jsonschema').validate;

router.get('/sample', function(req, res, next) {
  const db = req.db;
  const collection = db.get('sample');
  collection.find({},{},function(e,docs){
      res.send(docs);
  });
});

router.get('/', function(req, res, next) {
  res.send('Kids Save Ocean');
});

var ModelSchema = {
    type: 'object',
    properties: {
        number: {
            type: 'number',
            required: true
        }
    }
}

router.post('/model', validate({body: ModelSchema}), function(req, res, next) {
  res.send(req.body);
});

module.exports = router;
