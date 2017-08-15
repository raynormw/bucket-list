var jwt = require('jsonwebtoken')

var adminVerify = function (req, res, next) {
  jwt.verify.(req.headers.token, process.env.JWT, function (err, decoded) {

  })
}

var memberVerify = function (req, res, next) {

}

module.exports = {
  adminVerify,
  memberVerify
}
