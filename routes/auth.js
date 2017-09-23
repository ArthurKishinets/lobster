let passport = require('passport');
let router = require('express').Router();
let User = require('mongoose').model('user');
let util = require('util');

router.post('/signin', (req, res, next) => {
  if (!req.password && !req.email)
    res.end('Provide password and email.');
  else
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      next(null, user);
    });
});

router.post('/signup', (req, res, next) => {
  console.log('req.body ', req.body);
  if (!req.body.nickname || !req.body.email || !req.body.password)
    return res.end('Not enough information');
  let user = new User({ username: req.body.username, email: req.body.email, password: req.body.password });
  user.save((err) => {
    if (err) return next(err);
    console.log(1);
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect('/main');
    });
    //next(null, user);
  });
});

module.exports = router;