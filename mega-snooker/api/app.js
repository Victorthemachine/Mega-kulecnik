const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testAPIRouter = require("./routes/testAPI");
const initGameRouter = require('./routes/init');
const joinGameRouter = require('./routes/join');
const gameManagerRouter = require('./routes/gameManager');

const express = require('express');
const app = express();

/**
 * Note: This server runs on http://localhost:9000
 * Note: You can check if the server is running properly by navigating it. Example: https://localhost:9000/users
 *       Should display: "Currently no users! Come back later" => if it is displayed server and the route works.
 */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use('/init', initGameRouter);
app.use('/join', joinGameRouter);
app.use('/gameManager', gameManagerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
