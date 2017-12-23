const express = require('express');
const router = express.Router();
const passport = require('passport');
const { checkAuthentication } = require('./bin/helpers');

const authRoute = require('./routes/auth');
const index = require('./routes/index');
const users = require('./routes/users');

router.get('/api/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/api/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/main', failureRedirect: '/auth' }));

router.get('/api/auth/twitter', passport.authenticate('twitter'));
router.get('/api/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/profile', failureRedirect: '/register' }));

router.get('/api/auth/google', passport.authenticate('google',
  { scope: ['profile', 'email'] }));
router.get('/api/auth/google/callback', passport.authenticate('google',
  { successRedirect: '/profile', failureRedirect: '/register' }));

router.get('/api/', index.main);
router.get('/api/self', index.self);
router.get('/api/profile/photo', checkAuthentication, users.profilePhoto);
router.get('/api/users/all', checkAuthentication, users.allUsers);
router.post('/api/signin', authRoute.signIn);
router.post('/api/signup', authRoute.signUp);
  
module.exports = router;