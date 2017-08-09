var express = require('express')
var router = express.Router()
var storesCtrl = require('../controllers/storesCtrls')

router.post('/', storesCtrl.addStore)
router.get('/', storesCtrl.getAllStores)

module.exports = router
