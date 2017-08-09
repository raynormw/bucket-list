var express = require('express')
var router = express.Router()
var goodsCtrls = require('../controllers/goodsCtrls')

router.post('/', goodsCtrls.addGoods)
router.get('/', goodsCtrls.getAllGoods)
router.put('/:id', goodsCtrls.updateGoods)
router.delete('/:id', goodsCtrls.deleteGoods)

module.exports = router
