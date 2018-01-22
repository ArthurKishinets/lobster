// const express = require('express');
// const router = express.Router();
// const { checkAuthentication } = require('../bin/helpers');
const formidable = require('formidable');
// const util = require('util');
const cloudinary = require('cloudinary');
// const constants = require('../bin/const');
const mongoose = require('mongoose');
// const UserSchema = mongoose.model('user');
const _ = require('lodash');

module.exports.allUsers = function(req, res, next) {
  res.send('respond with a resource');
};

/* module.exports.profilePhotos = function(req, res, next) {
  debugger;
  const form = new formidable.IncomingForm();
  form.maxFieldsSize = 1 * 1024 * 1024;
  form.multiples = true;
  let filesSentCount = 0;
  let filesSavedCount = 0;
  let filesAmount = 0;
  let uploaded = 0;
  form
    .on('fileBegin', () => {
      filesAmount++;
    })
    .on('file', (field, file) => {
      console.log('new file ', file);
      cloudinary.uploader.upload(file.path, function(result) {
        if (result.error) {
          return res.status(403).send({ status: 'Error has occured' });
        }
        req.user.photos.push(result.url);
        req.user.save((e) => {
          if (e)
            throw e;
          uploaded++;
          if (filesAmount && filesAmount === uploaded)
            res.status(200).json({result: req.user, status: 'user updated'});
        });
      });
    })
    .on('field', function(name, value) {
      if (/(looking_for_)(.{1,})/.test(name)) {
        req.user.looking_for[name.replace('looking_for_', '')] = value;
      } else if (name === 'location') {
        req.user.location = [value.split(':')[0], value.split(':')[1]];
      } else {
        req.user[name] = value;
      }
      req.user.save(e => {
        if (e) throw e;
      });
    })
    .on('error', function(err) {
      console.error(err);
      process.exit(1);
    })
    .on('end', function() {
      if (!filesAmount)
        res.status(200).json({result: req.user, status: 'user updated'});
    })
    .parse(req);
}; */

module.exports.profilePhotos = function (req, res, next) {
  let uploaded = 0;
  const photos = req.body.filter(p => (typeof p === 'string'));
  photos.forEach(p => {
    cloudinary.uploader.upload(p, function (result) {
      if (result.error) {
        return res.status(403).send({ status: 'Error has occured' });
      }
      req.user.photos.push(result.url);
      req.user.save((e) => {
        if (e)
          return next(e);
        uploaded++;
        if (photos.length === uploaded)
          res.status(200).json({ result: req.user, status: 'user updated' });
      });
    });
  });
};

module.exports.updateUser = function(req, res, next) {
  const locationChanged = req.body.location.filter((c, i) => c[i] !== req.user.location[i]).length;
  _.merge(req.user, req.body);
  if (locationChanged)
    req.user.markModified('location');
  req.user.save((e) => {
    if (e) {
      console.log(e);
      return next(e);
    }
    res.status(200).send({ status: 'User has been successfully updated', result: req.user });
  });
};
