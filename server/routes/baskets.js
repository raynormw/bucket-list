var express = require('express')
var router = express.Router()
var basketsCtrls = require('../controllers/basketsCtrls')

router.get('/getitems/:basket_id', basketsCtrls.getAllItemInABasket)
router.get('/', basketsCtrls.getAllBaskets)
router.delete('/:basket_id/delete', basketsCtrls.deleteBasket)
router.put('/:basket_id/:member_id/update', basketsCtrls.updateBasket)
router.post('/createbasket', basketsCtrls.createBasket)
router.post('/:basket_id/additem', basketsCtrls.addGoodsToBasket)
router.delete('/:basket_id/:goods_id/removeitem', basketsCtrls.removeGoodsGromBasket)
router.put('/:basket_id/:goods_id/editpcs', basketsCtrls.updateItemsQuantityInABasket)

module.exports = router
