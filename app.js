var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cors = require('cors')
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var ideas = require('./routes/ideas');
var users = require('./routes/users');
var auth = require('./routes/auth');
var uploads = require('./routes/uploads');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/mevn-boilerplate', { useNewUrlParser: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(favicon(path.join(__dirname, 'dist/static/img', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')));
//uploads Multer folder
app.use(express.static("./uploads"));
app.use('/ideas', ideas);
app.use('/users', users);
app.use('/api/auth', auth);
app.use('/uploads', uploads);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500)
  res.sendFile('/dist/error.html', { error: err })
});

app.set('view engine', 'html');
module.exports = app;
