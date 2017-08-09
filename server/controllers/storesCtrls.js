var storesModel = require('../models').Store
var storeGoodsModel = require('../models').Stores_Good

var addStore = function (req, res) {
  storesModel.create({
    name: req.body.name,
    lat_long: req.body.lat_long
  })
  .then(function (result) {
    res.send(result)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getAllStores = function (req, res) {
  storesModel.findAll({})
  .then(function (stores) {
    res.send(stores)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getStore = function (req, res) {
  storesModel.find({
    where: {
      id: req.params.id
    }
  })
  .then(function (store) {
    res.send(store)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var deleteStore = function (req, res) {
  storesModel.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (store) {
    store.destroy()
    .then(function () {
      res.send({msg: `Store with id ${req.params.id} deleted`})
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var updateStore = function (req, res) {
  storesModel.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (store) {
    storesModel.update({
      name: req.body.name || store.name,
      lat_long: req.body.lat_long || store.lat_long
    }, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
    .then(function (updatedStore) {
      res.send(updatedStore[1])
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var addGoodsInStore = function (req, res) {
  storeGoodsModel.create({
    store_id: req.params.store_id,
    good_id: req.body.good_id,
    price: req.body.price
  })
  .then(function (StoresGoods) {
    res.send(StoresGoods)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getAllGoodsInAStore = function (req, res) {
  storeGoodsModel.findAll({
    where: {
      store_id: req.params.store_id
    }
  })
  .then(function (goodsList) {
    res.send(goodsList)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var deleteGoodsFromStore = function (req, res) {
  storeGoodsModel.findOne({
    where: {
      store_id: req.params.store_id,
      good_id: req.params.good_id
    }
  })
  .then(function (goodsStore) {
    goodsStore.destroy()
    .then(function () {
      res.send({msg: `Good store with id ${goodsStore.id} deleted`})
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var updateGoodsPriceInAStore = function (req, res) {
  storeGoodsModel.findOne({
    where: {
      store_id: req.params.store_id,
      good_id: req.params.good_id
    }
  })
  .then(function (goodsStore) {
    storeGoodsModel.update({
      price: req.body.price || goodsStore.name
    }, {
      where: {
        store_id: req.params.store_id,
        good_id: req.params.good_id
      },
      returning: true,
      plain: true
    })
    .then(function (updatedgoodsStore) {
      res.send(updatedgoodsStore[1])
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
  addStore,
  getAllStores,
  getStore,
  deleteStore,
  updateStore,
  addGoodsInStore,
  getAllGoodsInAStore,
  deleteGoodsFromStore,
  updateGoodsPriceInAStore
}
