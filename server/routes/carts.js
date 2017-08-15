var express = require('express')
var router = express.Router()
var cartCtrls = require('../controllers/cartsCtrls')

router.post('/', cartCtrls.addCart)
router.get('/', cartCtrls.getAllCarts)
router.get('/:user_id', cartCtrls.getUserCarts)
router.get('/:id', cartCtrls.getCart)
router.delete('/:id', cartCtrls.deleteCart)
router.post('/:cart_id/addgoods', cartCtrls.addGoodsToCart)
router.delete('/:cart_id/removegoods', cartCtrls.removeGoodsFromCart)
router.put('/:cart_id/:store_id/:goods_id/quantity', cartCtrls.changeCartItemQuantity)

module.exports = router
