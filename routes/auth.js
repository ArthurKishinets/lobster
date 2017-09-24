let passport = require('passport');
let router = require('express').Router();
let User = require('mongoose').model('user');
let util = require('util');
let debug = require('debug')('req:body');

router.post('/signin', (req, res, next) => {
  debug(req.body);
  if (!req.body.password || !req.body.email)
    res.end('Provide password and email.');
  else {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      req.logIn(user, (err) => {
        if (err) return err;
        res.end('U successfully logged in');
      });
    })(req, res, next);
  }
});

router.post('/signup', (req, res, next) => {
  debug('req.body ', req.body);
  if (!req.body.nickname || !req.body.email || !req.body.password)
    return res.end('Not enough information');
  let user = new User({ username: req.body.username, email: req.body.email, password: req.body.password });
  user.save((err) => {
    if (err) return next(err);
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect('/main');
    });
  });
});

module.exports = router;