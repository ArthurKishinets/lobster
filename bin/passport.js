let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
require('./mongoose');
let User = require('mongoose').model('user');
let debug = require('debug')('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let configAuth = require('./const');

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

/**
 * Facebook strategy
 */

 // FACEBOOK =======================
passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL,
  passReqToCallback: true,
  profileFields: ['id', 'displayName', 'picture.width(1000)', 'email', 'name', 'link', 'locale', 'timezone']
},
  function (req, token, refreshToken, profile, done) {
    //process.nextTick(function () {
      if (!req.user) {
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, user);
          } else {
            var newUser = new UserSchema({
              facebook: {
              }
            });
            newUser.facebook.token = token;
            newUser.facebook.id = profile.id; 
            newUser.facebook.name = profile.displayName;
            newUser.facebook.email = profile.email || '';
            newUser.facebook.fullProfile = profile;
            //newUser.facebook.photo = "https://graph.facebook.com/" + profile.username +
            //"/picture" + "?width=200&height=200" + "&access_token=" + token;
            // save our user to the database
            newUser.save(function (err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      } else {
        var user = req.user;
        user.facebook.token = token; 
        user.facebook.id = profile.id; 
        user.facebook.name = profile.displayName;
        user.facebook.email = profile.email;
        user.save(function (error) {
          if (error)
            throw error;
          return done(null, user);
        });
      }
    //});
  }));
/*
// Twitter =======================
passport.use(new TwitterStrategy({
  // pull in our app id and secret from our auth.js file
  consumerKey: configAuth.twitterAuth.consumerKey,
  consumerSecret: configAuth.twitterAuth.consumerSecret,
  callbackURL: configAuth.twitterAuth.callbackURL,
  passReqToCallback: true
},
  // facebook will send back the token and profile
  function (req, token, tokenSecret, profile, done) {
    // asynchronous
    process.nextTick(function () {
      if (!req.user) {
        // find the user in the database based on their facebook id
        User.findOne({ 'twitter.id': profile.id }, function (err, user) {
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);
          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser = new UserSchema({
              twitter: {
              }
            });
            console.log('profile', profile);
            console.log('token', token);
            console.log('newUser', newUser);
            // set all of the facebook information in our user model
            newUser.twitter.id = profile.id;
            newUser.twitter.token = token;
            newUser.twitter.username = profile.username;
            newUser.twitter.displayName = profile.displayName;
            newUser.save(function (err) {
              if (err)
                throw err;
              // if successful, return the new user
              return done(null, newUser);
            });
          }
        });
      } else {
        var user = req.user;
        user.twitter.id = profile.id;
        user.twitter.token = token;
        user.twitter.username = profile.username;
        user.twitter.displayName = profile.displayName;
        user.save(function (error) {
          if (error)
            throw error;
          return done(null, user);
        });
      }
    });
  }));

// GOOGLE ==================================================================
passport.use(new GoogleStrategy({
  clientID: configAuth.googleAuth.clientID,
  clientSecret: configAuth.googleAuth.clientSecret,
  callbackURL: configAuth.googleAuth.callbackURL,
  passReqToCallback: true
},
  function (req, token, refreshToken, profile, done) {
    process.nextTick(function () {
      if (!req.user) {
        User.findOne({ 'google.id': profile.id }, function (err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, user);
          } else {
            var newUser = new UserSchema();
            var newUser = new UserSchema({
              google: {
                id: profile.id,
                token: token,
                name: profile.displayName,
                email: profile.emails[0].value
              }
            });
            newUser.save(function (err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      } else {
        var user = req.user;
        user.google.id = profile.id;
        user.google.token = token;
        user.google.name = profile.displayName;
        user.google.email = profile.emails[0].value;
        user.save(function (err) {
          if (err)
            throw err;
          return done(null, user);
        });
      }
    });
  })); */

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    err
      ? done(err)
      : done(null, user);
  });
});

module.exports = {
  local,
};