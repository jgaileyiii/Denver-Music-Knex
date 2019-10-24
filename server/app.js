const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')


const app = express();

const teachers = require('./api/teachers')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors())
app.use('/api/v1/teachers', teachers)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not found')
  err.status = 404
  next(err)
});

// error handler
app.use(function(err, req, res, next) {
 
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
