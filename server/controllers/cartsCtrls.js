var cartsModel = require('../models').Cart
var cartsItemsModel = require('../models').Carts_Item

var addCart = function (req, res) {
  cartsModel.create({
    user_id: req.body.user_id
  })
  .then(function (cart) {
    res.send(cart)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getAllCarts = function (req, res) {
  cartsModel.findAll()
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
      user_id: req.params.user_id
    }
  })
  .then(function (carts) {
    res.send(carts)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getCart = function (req, res) {
  cartsModel.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (cart) {
    res.send(cart)
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
