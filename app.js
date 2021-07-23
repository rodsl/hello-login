const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: Math.random().toString(36).slice(-10) }));


const { log } = console;

app.use((req, res, next) => {
  log(`VerboHttp: ${req.method}, VersaoHttp: ${req.httpVersion}, Caminho: ${req.path}, Ip: ${req.ip}`);
  next();
});

app.use('/', (req, res, next) => {
  log(`VerboHttp: ${req.method}, VersaoHttp: ${req.httpVersion}, Caminho: ${req.path}, Ip: ${req.ip}`);
  next();
});

app.use('/financeiro', (req, res, next) => {
  log(`O ip ${req.ip} esta fazendo alguma operação financeiro`);
  next();
});

app.delete('/financeiro', (req, res, next) => {
  log(`WARNING: Alguem deletou um registro do financeiro`);

  if (req.ip !== '200.150.122.366') {
    throw new Error("voce não esta autorizado a fazer isso");
  }

  next();
});

app.use('/financeiro/compra/banana', (req, res) => {
  log(`O ip ${req.ip} esta fazendo alguma operação financeiro`);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
