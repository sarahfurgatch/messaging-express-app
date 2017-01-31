var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs'); 

var routes = require('./routes/views/index');
var users = require('./routes/views/users');
var conversation = require('./routes/views/conversation');
var apiConversations = require('./routes/api/conversations');

var app = express();

//read from conversations JSON file and store locally:
app.all('*', function(req, res, next){
  fs.readFile('./api/conversations.json', function(err, data){
    res.locals.conversations = JSON.parse(data);
    next();
  });
});

//read from users JSON file and store locally:
app.all('*', function(req, res, next){
  fs.readFile('./api/users.json', function(err, data){
    res.locals.users = JSON.parse(data);
    next();
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/conversation', conversation);
app.use('/api/conversations', apiConversations);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
