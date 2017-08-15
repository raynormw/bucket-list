var basketsModel = require('../models').Basket
var basketsItemsModel = require('../models').Baskets_Item
var goodsModel = require('../models').Good

var createBasket = function (req, res) {
  basketsModel.create({
    member_id: req.body.member_id
  })
  .then(function (basket) {
    res.send(basket)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var addGoodsToBasket = function (req, res) {
  basketsItemsModel.create({
    goods_id: req.body.goods_id,
    quantity: req.body.quantity,
    basket_id: req.body.basket_id
  })
  .then(function (basket_item) {
    res.send(basket_item)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var removeGoodsGromBasket = function (req, res) {
  basketsItemsModel.findOne({
    where: {
      basket_id: req.body.basket_id,
      goods_id: req.body.goods_id
    }
  })
  .then(function (item) {
    if (!item) {
      res.status(404).send({msg: 'Item not found'})
    } else {
      item.destroy()
      .then(function () {
        res.send({msg: 'Item deleted'})
      })
      .catch(function (err) {
        res.status(500).send(err)
      })
    }
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getAllItemInABasket = function (req, res) {
  basketsItemsModel.findAll({
    where: {
      basket_id: req.params.basket_id
    },
    include: [{
      model: goodsModel
    }]
  })
  .then(function (itemsBasket) {
    res.send(itemsBasket)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var updateItemsQuantityInABasket = function (req, res) {
  basketsItemsModel.findOne({
    where: {
      basket_id: req.params.basket_id,
      goods_id: req.params.goods_id
    }
  })
  .then(function (basketsItem) {
    
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

module.exports = {
  createBasket,
  addGoodsToBasket,
  getAllItemInABasket,
  removeGoodsGromBasket,
  updateItemsQuantityInABasket
}
