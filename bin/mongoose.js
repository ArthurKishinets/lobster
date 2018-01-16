const mongoose = require('mongoose');
const debug = require('debug')('mongoose');
const constants = require('./const');

/**
 * Connect to the database
 */

mongoose.connect(`mongodb://${constants.dbCredentials}@ds135574.mlab.com:35574/krovostok`, 
  { useMongoClient: true, promiseLibrary: global.Promise, config: { autoIndex: false } }, (err) => {
    if (err)
      throw err;
    else
      debug('mongodb connected');
  });

mongoose.connection.on('error', (err) => {
  debug('db error o%', err);
  throw err;
});

/**
 * Define user schema
 */

let userSchema = mongoose.Schema({
  nickname: String,
  email: {
    type: String,
    // validate: (v) => {
    //   return v.indludes('@');
    // }
  },
  gender: String,
  password: {
    type: String,
  },
  nickname: {
    type: String,
  },
  user_group: {
    type: Number,
  },
  about_me: String,
  city: String,
  age: Number,
  looking_for: {
    age: Number,
    gender: String,
  },
  rejections: Array,
  approvals: Array,
  facebook: {
    id           : String,
    token        : String,
    email        : String,
    name         : String,
    fullProfile  : Object,
    photo        : String
  },
  twitter: {
    id           : String,
    token        : String,
    username     : String,
    displayName  : String
  },
  google: {
    id: String,
    token: String,
    name: String,
    email: String
  },
  photos: Array,
});

userSchema.options.toJSON = {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
};

let User = mongoose.model('user', userSchema);

module.exports = {
  User,
};