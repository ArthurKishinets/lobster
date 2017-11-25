var express = require('express');
var router = express.Router();
const path = require('path');
const _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/dist', 'index.html'));
});

router.get('/self', function(req, res, next) {
  if (!req.user) return res.send({ status: 'user is not authenticated' });
  return res.send({ status: 'user is authenticated', result: req.user });
});

module.exports = router;
