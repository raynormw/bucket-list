var express = require('express')
var router = express.Router()
var memberCtrls = require('../controllers/memberCtrls')

router.post('/signup', memberCtrls.signUp)
router.post('/signin', memberCtrls.signIn)

module.exports = router
