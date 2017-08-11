var express = require('express')
var router = express.Router()
var memberCtrls = require('../controllers/membersCtrls')

router.post('/signup', memberCtrls.signUp)
router.post('/signin', memberCtrls.signIn)

module.exports = router
