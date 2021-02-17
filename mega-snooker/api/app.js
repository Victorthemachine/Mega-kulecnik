const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const SVGTool = require('./utilities/svgTool');
const svgTool = new SVGTool();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testAPIRouter = require("./routes/testAPI");

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

app.get('/assets/:name/:id', (req, res) => {
  svgTool.convertSVGtoJSX(path.join(__dirname, '/assets/', req.params.name, `${req.params.id}.svg`))
    .then(sendThis => {
      res.send(sendThis);
    })
    .catch(err => console.error(err));
});

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
