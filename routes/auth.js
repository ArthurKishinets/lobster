let passport = require('passport');
let router = require('express').Router();
let User = require('mongoose').model('user');
let util = require('util');
let debug = require('debug')('req');

router.post('/signin', (req, res, next) => {
  debug('signin', req.body);
  debug(req.body);
  if (!req.body.password || !req.body.email)
    return res.send({result: {}, status: 'Provide password and email.'});
  else {
    passport.authenticate('local', (err, user, info) => {
      debug('2 user ', user);
      if (err) return next(err);
      if (!Object.keys(user).length) return res.send({result: {}, status: 'There is no such user'});
      req.logIn(user, (err) => {
        debug('3', req.body);
        if (err) return next(err);
        debug('4', req.body);
        return res.send({result: user, status: 'U successfully logged in'});
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