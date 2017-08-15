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

var getAllBaskets = function (req, res) {
  basketsModel.findAll()
  .then(function (baskets) {
    res.send(baskets)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var deleteBasket = function (req, res) {
  basketsModel.findOne({
    where: {
      id: req.params.basket_id,
      member_id: req.body.member_id
    }
  })
  .then(function (basket) {
    if (!basket) {
      res.status(404).send({msg: `Basket not found`})
    } else {
      basket.destroy()
      .then(function () {
        res.send({msg: `Basket deleted`})
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

var updateBasket = function (req, res) {
  basketsModel.findOne({
    where: {
      id: req.params.basket_id,
      member_id: req.params.member_id
    }
  })
  .then(function (basket) {
    if (!basket) {
      res.status(404).send({msg: `Basket not found`})
    } else {
      basketsModel.update({
        member_id: req.body.member_id
      }, {
        where: {
          id: req.params.basket_id,
          member_id: req.params.member_id
        }
      })
      .then(function () {
        res.send({msg: 'Basket updated'})
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

var addGoodsToBasket = function (req, res) {
  basketsItemsModel.create({
    goods_id: req.body.goods_id,
    quantity: req.body.quantity,
    basket_id: req.params.basket_id
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
      basket_id: req.params.basket_id,
      goods_id: req.params.goods_id
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
    basketsItemsModel.update({
      quantity: req.body.quantity || basketsItem.quantity
    }, {
      where: {
        basket_id: req.params.basket_id,
        goods_id: req.params.goods_id
      }
    })
    .then(function () {
      res.send({msg: 'Update quantity success'})
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

module.exports = {
  createBasket,
  getAllBaskets,
  deleteBasket,
  updateBasket,
  addGoodsToBasket,
  getAllItemInABasket,
  removeGoodsGromBasket,
  updateItemsQuantityInABasket
}
