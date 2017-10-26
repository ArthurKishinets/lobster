var express = require('express');
var router = express.Router();
const path = require('path');
const _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/dist', 'index.html'));
});

router.get('/self', function(req, res, next) {
  return res.send({ result: _.pick(req.user, ['email', 'password']) });
});

module.exports = router;
