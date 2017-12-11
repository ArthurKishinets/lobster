const express = require('express');
const router = express.Router();
const path = require('path');
const debug = require('debug')('req');

/* GET home page. */
module.exports.main = function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/dist', 'index.html'));
};

module.exports.self = function(req, res, next) {
  if (!req.user) return res.send({ status: 'user is not authenticated' });
  return res.send({ status: 'user is authenticated', result: req.user });
};
