var express = require('express')
var router = express.Router()
var basketsCtrls = require('../controllers/basketsCtrls')

router.post('/getitems', basketsCtrls.getAllItemInABasket)
router.post('/createbasket', basketsCtrls.createBasket)
router.post('/additem', basketsCtrls.addGoodsToBasket)
router.delete('/removeitem', basketsCtrls.removeGoodsGromBasket)

module.exports = router
