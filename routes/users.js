const express = require('express');
const router = express.Router();
const { checkAuthentication } = require('../bin/helpers');
const formidable = require('formidable');
const util = require('util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.post('/profile/photo', checkAuthentication, function(req, res, next) {

  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.send({ status: 'error has occured while uploading file' });
    }
    console.log(util.inspect({fields: fields, files: files}));
    res.statusCode = 200;
    res.setHeader('content-type', 'text/plain');
    return res.send('received upload:\n\n');
    //res.send('respond with a resource');
  });

  return;
});

module.exports = router;
