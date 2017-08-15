var basketsModel = require('../models').Basket
var basketsItemsModel = require('../models').Baskets_Item

var createBasket = function (req, res) {
  basketsModel.create({
    member_id: req.body.member_id
  })
  .then(function (basket) {
    res.send(basket)
  })
  .catch(function (err) {
    res.status(404).send(err)
  })
}

var addGoodsToBasket = function (req, res) {
  basketItemsModel.create({
    goods_id: req.body.goods_id,
    quantity: req.bo
  })
}

var removeGoodsToBasket = function (req, res) {

}

module.exports = {

}
