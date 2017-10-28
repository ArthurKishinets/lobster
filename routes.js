var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/api/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/api/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/main', failureRedirect: '/auth' }));

module.exports = router;