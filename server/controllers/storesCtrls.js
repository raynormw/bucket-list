
const _ = require('lodash')
const distance = require('geo-coords-distance')
var storesModel = require('../models').Store
var storeGoodsModel = require('../models').Stores_Good
var goodsModel = require('../models').Good
var PricingAlgorithm = require('../algorithm/pricing')

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
    if (!store) {
      res.status(404).send({msg: `Store with id ${req.params.id} not found`})
    } else {
      res.send(store)
    }
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
    if (!store) {
      res.send({msg: `Store with id ${req.params.id} not found`})
    } else {
      storesModel.update({
        name: req.body.name || store.dataValues.name,
        lat_long: req.body.lat_long || store.dataValues.lat_long
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
    }
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
    },
    include: [{
      model: storesModel
    }, {
      model: goodsModel
    }]
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

const findStoresWithinRadius = function (location) {
  const MAXIMUM_STORE_RANGE = 5000

  return new Promise((resolve, reject) => {
    storesModel.findAll({
      where: {}
    })
    .then((stores) => {
      const result = []
      for (var i = 0; i < stores.length; i += 1) {
        const store = stores[i]
        const firstPoint = { lat: location.lat, lng: location.lng }
        const secondPoint = { lat: store.lat, lng: store.lng }

        const storeDistance = distance.default(firstPoint, secondPoint)
        if (storeDistance <= MAXIMUM_STORE_RANGE) {
          result.push(store)
        }
      }

      resolve(result)
    })
  })
}

const findStoresGoodsMatchItemsAndLocation = function (items, location) {
  return new Promise((resolve, reject) => {
    const itemIds = _.map(items, 'goodId')
    findStoresWithinRadius(location)
    .then((stores) => {
      const storeIds = _.stores(stores, 'id')

      storeGoodsModel.findAll({
        where: {
        },
        include: [
          {
            model: goodsModel,
            where: {
              id: itemIds
            }
          },
          {
            model: storesModel,
            where: {
              id: storeIds
            }
          }
        ]
      })
      .then((storesGoodsMatchItems) => {
        resolve(storesGoodsMatchItems)
      })
    })
  })
}

const searchNearbyStore = function (req, res) {
  const requestData = req.body
  const userLocation = requestData.location
  const items = requestData.items

  findStoresGoodsMatchItemsAndLocation(items, userLocation)
  .then((storesGoodsMatchItemsAndLocation) => {
    const pricingAlgorithm = new PricingAlgorithm(storesGoodsMatchItemsAndLocation, items)
    const result = pricingAlgorithm.getOptmizedModels()

    res.json(result)
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
  updateGoodsPriceInAStore,
  searchNearbyStore
}
