let passport = require('passport');
let router = require('express').Router();
let User = require('mongoose').model('user');
let util = require('util');
let debug = require('debug')('req');

router.post('/signin', (req, res, next) => {
  debugger;
  if (!req.body.password || !req.body.email)
    return res.send({result: {}, status: 'Provide password and email.'});
  else {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!Object.keys(user).length) return res.send({result: {}, status: 'There is no such user'});
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.send({result: user, status: 'U successfully logged in'});
      });
    })(req, res, next);
  }
});

router.post('/signup', (req, res, next) => {
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
    let user = new User({ nickname: req.body.nickname, email: req.body.email, password: req.body.password });
    user.save((err) => {
      if (err) return next(err);
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.send({ status: 'user successfully signed up' });
      });
    });
  });
});

module.exports = router;