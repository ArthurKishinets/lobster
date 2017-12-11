const express = require('express');
const router = express.Router();
const passport = require('passport');
const { checkAuthentication } = require('./bin/helpers');

const authRoute = require('./routes/auth');
const index = require('./routes/index');
const users = require('./routes/users');

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

router.get('/', index.main);
router.get('/self', index.self);
router.get('/profile/photo', checkAuthentication, users.profilePhoto);
router.get('/users/all', checkAuthentication, users.allUsers);
router.post('/signin', authRoute.signIn);
router.post('/signup', authRoute.signUp);
  
module.exports = router;