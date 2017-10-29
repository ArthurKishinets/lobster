var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/main', failureRedirect: '/auth' }));

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/profile', failureRedirect: '/register' }));

router.get('/auth/google', passport.authenticate('google',
  { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google',
  { successRedirect: '/profile', failureRedirect: '/register' }));
  
module.exports = router;