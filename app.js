var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var profileRouter = require('./routes/profileRouter');

const mongoose = require('mongoose');
var app = express();

const url = 'mongodb://localhost:27017';
const dbName = 'WorkForce';
const connect = mongoose.connect(url+'/'+dbName);

connect.then((db)=>{
  console.log("Connected to db using mongoose, db: ",db); 
}, (err) => {console.log(err)});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//defining the session
app.use(session({
  name:'session-id',
  secret: '12344321',
  saveUninitialized : false,
  resave: false,
  store: new FileStore()
}));

//these routes can be executed without authentication
//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));

//authentication
const auth = (req, res, next) => {
  console.log("Logging session: ", req.session);

  //if user not authenticated
  if(!req.session.user){
    var err = new Error("You are not authenticated.");
    err.status = 401;
    next(err);
  } else{
    if(req.session.user = 'authenticated'){
      next();
    } else{
      var err = new Error("You are not authenticated yet...");
      err.status = 403;
      next(err);
    }
  }
}

app.use(auth);

app.use('/profiles', profileRouter); //added this

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
