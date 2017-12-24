const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const myPassport = require('./bin/passport');
const passport = require('passport');
const router = express.Router();
const session = require('express-session');
const cloudinary = require('cloudinary');
const constants = require('./bin/const');

/* const authRoute = require('./routes/auth');
const index = require('./routes/index');
const users = require('./routes/users');*/
const routes = require('./routes.js'); 

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser);
app.use(bodyParser.json());
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({
  extended: false,
  cookie : {
    //secure : false,
    maxAge : (4 * 60 * 60 * 1000),
  }
}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
passport.use(myPassport.local);

/* app.get('/', index);
app.use('/users', users);
app.use('/', authRoute); */
app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public/dist')));

cloudinary.config({ 
  cloud_name: constants.cloudinary.cloud_name, 
  api_key: constants.cloudinary.api_key, 
  api_secret: constants.cloudinary.api_secret, 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
/*   var err = new Error('Not Found');
  err.status = 404;
  next(err); */
  console.log('req.originalUrl ', req.originalUrl);
  if (req.originalUrl.includes('.')) return next(null);
  //res.sendFile(path.join(__dirname, './public/dist', 'index.html'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  process.emit(1);
});

module.exports = app;
