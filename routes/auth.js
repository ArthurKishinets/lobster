let passport = require('passport');
let router = require('express').Router();
let User = require('mongoose').model('user');
let util = require('util');
let debug = require('debug')('req');

router.post('/signin', (req, res, next) => {
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
  let user = new User({ username: req.body.username, email: req.body.email, password: req.body.password });
  user.save((err) => {
    if (err) return next(err);
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.send({ status: 'user successfully signed up' });
    });
  });
});

module.exports = router;