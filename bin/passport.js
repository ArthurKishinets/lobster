let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
require('./mongoose');
let User = require('mongoose').model('user');
let debug = require('debug')('passport');

let local = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    err ? done(err) :
      user ? 
        password === user.password ? done(null, user) : done(null, false)
      : done(null, false);
  });
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user){
    err 
      ? done(err)
      : done(null,user);
  });
});

module.exports = {
  local,
};