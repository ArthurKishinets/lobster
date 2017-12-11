const express = require('express');
const router = express.Router();
const { checkAuthentication } = require('../bin/helpers');
const formidable = require('formidable');
const util = require('util');
const cloudinary = require('cloudinary');
const constants = require('../bin/const');
const mongoose = require('mongoose');
const UserSchema = mongoose.model('user');

module.exports.allUsers = function(req, res, next) {
  res.send('respond with a resource');
};

module.exports.profilePhoto = function(req, res, next) {
  const form = new formidable.IncomingForm();
  form.maxFieldsSize = 1 * 1024 * 1024;
  form.multiples = true;
  let filesSentCount = 0;
  let filesSavedCount = 0;
  form.on('file', (field, file) => {
    cloudinary.uploader.upload(file.path, function(result) {
      if (result.error) {
        return;
      }
      req.user.photos.push(result.url);
      req.user.save((e) => {
        if (e)
          throw e;
        filesSavedCount++;
        if (filesSavedCount === filesSentCount)
          res.status(200).json({ photos: req.user.photos });
      });
      console.log('request ', req);
    });
  })
  .on('error', function(err) {
    console.error(err);
    process.exit(1);
  })
  .on('file', function () {
    filesSentCount++;
  });
  form.parse(req);
  return;
};
