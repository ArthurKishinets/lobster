const express = require('express');
const router = express.Router();
const { checkAuthentication } = require('../bin/helpers');
const formidable = require('formidable');
const util = require('util');
const cloudinary = require('cloudinary');
const constants = require('../bin/const');
var mongoose = require('mongoose');
var UserSchema = mongoose.model('user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/profile/photo', checkAuthentication, function(req, res, next) {
  const form = new formidable.IncomingForm();
  form.maxFieldsSize = 1 * 1024 * 1024;
  form.multiples = true;
  let files = [];

  form.on('file', (field, file) => {
    console.log(field, file);
    cloudinary.uploader.upload(file.path, function(result) {
      if (result.error) {
        return;
      }
      req.user.photos.push(result.url);
      req.user.save((e) => {
        if (e)
          throw e;
      });
      console.log('request ', req);
    });
    files.push([field, file]);
  })
  .on('error', function(err) {
    console.error(err);
    process.exit(1);
  })
  .on('end', function () {
    res.status(200).json(JSON.stringify({photos: req.user.photos}));
  });

  form.parse(req);
  return;
});

module.exports = router;
