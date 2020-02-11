const express = require('express');
const router = express.Router();

router.get('/sample', function(req, res, next) {
  res.send('Hello from the API!');
});

router.get('/', function(req, res, next) {
  res.send('Kids Save Ocean');
});

module.exports = router;
