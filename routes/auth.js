const passport = require('passport');
const router = require('express').Router();
const User = require('mongoose').model('user');
const util = require('util');
const debug = require('debug')('req');

module.exports.signIn = function (req, res, next) {
  console.log('signIn signIn');
  if (!req.body.password || !req.body.email)
    return res.send({result: {}, status: 'Provide password and email.'});
  else {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!Object.keys(user).length) return res.send({result: {}, status: 'There is no such user'});
      req.login(user, (err) => {
        if (err) return next(err);
        return res.send({result: user, status: 'U successfully logged in'});
      });
    })(req, res, next);
  }
};

module.exports.signUp = function(req, res, next) {
  if (!req.body.nickname || !req.body.email || !req.body.password)
    return res.send({status: 'Not enough information'});
  User.find({ $or: [{ email: req.body.email}, {nickname : req.body.nickname}] }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser.length) {
      req.body.nickname === existingUser[0].nickname ? 
        res.send({ status: 'user with that nickname is already exist' }) :
        res.send({ status: 'user with that email is already exist' });
      return;
    }
    let user = new User({ 
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password,
      user_group: 1,
    });
    user.save((err) => {
      if (err) return next(err);
      req.login(user, (err) => {
        if (err) return next(err);
        return res.send({ status: 'user successfully signed up' });
      });
    });
  });
};
