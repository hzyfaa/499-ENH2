require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
const userRouter = require('./app_server/routes/user');
const aboutRouter = require('./app_server/routes/about')
const contactRouter = require('./app_server/routes/contact')

// ********
var searchRouter = require('./app_server/routes/');
const trie = require('./utils/airportdata.js');
// ********

const apiRouter = require('./app_api/routes/index');

const handleBars = require('hbs');

require('./utils/airportdata.js');
require('./app_api/models/db');
require('./app_api/config/passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials
handleBars.registerPartials(__dirname + '/app_server/views/partials')
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// ********
// ********

// Enable CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

// routes
app.use('/home', indexRouter);
app.use('/travel', travelRouter);
app.use('/user', userRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

// implement search router
// ************
app.use(searchRouter);
app.get('/search', (req, res) => {
  const query = req.query.q;
  const results = trie.search(query);
  res.json(results.length ? results : []);
});
// ************

app.use('/api', apiRouter);

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

// unauthorized error - 401 err
app.use(function (err, req, res, next) {
  if (err.name == 'UnauthorizedError') {
    res.status(401).json({ 'message': err.name + ': ' + err.message });
  }
});

module.exports = app;