var express = require('express')
var router = express.Router()
var storesCtrl = require('../controllers/storesCtrls')

router.post('/', storesCtrl.addStore)
router.get('/', storesCtrl.getAllStores)
router.get('/:id', storesCtrl.getStore)
router.delete('/:id', storesCtrl.deleteStore)
router.put('/:id', storesCtrl.updateStore)
router.post('/:store_id/addgoods', storesCtrl.addGoodsInStore)
router.put('/:store_id/:good_id/pricing', storesCtrl.updateGoodsPriceInAStore)
router.get('/:store_id/getgoods', storesCtrl.getAllGoodsInAStore)
module.exports = router
