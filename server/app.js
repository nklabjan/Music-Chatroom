var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playerRouter = require('./routes/player');
const {Client} = require('pg');

const client = new Client({
  user: 'iddgxdpmzvrgnq',
  host: 'ec2-54-83-55-122.compute-1.amazonaws.com',
  database: 'd5a45rpdbn8ojc',
  password: 'ed9db27f9307fbe752382ed5e5d87ca5eb01240893e16afa65bff0bab8530c8d',
  port: 5432,
  ssl: true
})
client.connect();

client.on('error', function (err) {
  console.log('Database error!', err);
  console.log("Attempting to reconnect in 5 seconds");
  setTimeout(function(){
    client.connect()}, 5000);
});

var app = express();
// view engine setup
app.locals.chatrooms = {};
app.locals.idCounter = 1;
app.locals.test = "test";
app.locals.dbClient = client;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/player', playerRouter);


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
