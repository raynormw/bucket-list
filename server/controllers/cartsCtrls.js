var cartsModel = require('../models').Cart
var cartsItemsModel = require('../models').Carts_Item
var storesModel = require('../models').Store
var storeGoodsModel = require('../models').Stores_Good
var goodsModel = require('../models').Good
var membersModel = require('../models').Member

var addCart = function (req, res) {
  cartsModel.create({
    member_id: req.body.member_id
  })
  .then(function (cart) {
    res.send(cart)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getAllCarts = function (req, res) {
  cartsModel.findAll({
    include: [{
      model: cartsItemsModel,
      include: [{
        model: storeGoodsModel
      }, {
        model: storesModel
      }, {
        model: goodsModel
      }]
    }, {
      model: membersModel,
      attributes: {
        exclude: ['password']
      }
    }]
  })
  .then(function (carts) {
    res.send(carts)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getUserCarts = function (req, res) {
  cartsModel.findAll({
    where: {
      member_id: req.params.member_id
    },
    include: [{
      model: cartsItemsModel,
      include: [{
        model: storeGoodsModel
      }, {
        model: storesModel
      }, {
        model: goodsModel
      }]
    }]
  })
  .then(function (carts) {
    if (!carts) {
      res.send({msg: `Cart with user id ${req.params.id} not found`})
    } else {
      res.send(carts)
    }
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getCart = function (req, res) {
  cartsModel.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: cartsItemsModel,
      include: [{
        model: storeGoodsModel
      }, {
        model: storesModel
      }, {
        model: goodsModel
      }]
    }]
  })
  .then(function (cart) {
    if (!cart) {
      res.send({msg: `Cart with id ${req.params.id} not found`})
    } else {
      res.send(cart)
    }
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var deleteCart = function (req, res) {
  cartsModel.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (cart) {
    cart.destroy()
    .then(function () {
      res.send({msg: `Cart with id ${req.params.id} deleted`})
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var addGoodsToCart = function (req, res) {
  cartsItemsModel.create({
    goods_id: req.body.goods_id,
    store_id: req.body.store_id,
    cart_id: req.params.cart_id,
    stores_goods_id: req.body.stores_goods_id,
    quantity: req.body.quantity
  })
  .then(function (cartGoods) {
    res.send(cartGoods)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var removeGoodsFromCart = function (req, res) {
  cartsItemsModel.findOne({
    where: {
      cart_id: req.params.cart_id,
      store_id: req.body.store_id,
      goods_id: req.body.goods_id
    }
  })
  .then(function (cartItem) {
    cartItem.destroy()
    .then(function () {
      res.send({msg: `Cart item with id ${cartItem.id} deleted`})
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var changeCartItemQuantity = function (req, res) {
  cartsItemsModel.findOne({
    where: {
      cart_id: req.params.cart_id,
      store_id: req.params.store_id,
      goods_id: req.params.goods_id
    }
  })
  .then(function (cartItem) {
    cartsItemsModel.update({
      quantity: req.body.quantity || cartItem.quantity
    }, {
      where: {
        cart_id: req.params.cart_id,
        store_id: req.params.store_id,
        goods_id: req.params.goods_id
      },
      returning: true,
      plain: true
    })
    .then(function (updatedCartItem) {
      res.send(updatedCartItem)
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
  addCart,
  getAllCarts,
  getUserCarts,
  getCart,
  deleteCart,
  addGoodsToCart,
  removeGoodsFromCart,
  changeCartItemQuantity
}
