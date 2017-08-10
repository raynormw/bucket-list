var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var stores = require('./routes/stores')
var goods = require('./routes/goods')
var carts = require('./routes/carts')
var members = require('./routes/members')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/stores', stores)
app.use('/api/goods', goods)
app.use('/api/carts', carts)
app.use('/api/members', members)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
