
var _ = require('lodash')
var distance = require('haversine')
var storesModel = require('../models').Store
var storeGoodsModel = require('../models').Stores_Good
var goodsModel = require('../models').Good
var PricingAlgorithm = require('../algorithm/pricing')

var MAXIMUM_STORE_RANGE = 2000;

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
    if (!store) {
      res.status(404).send({msg: `${req.params.id} not found`})
    } else {
      store.destroy()
      .then(function () {
        res.send({msg: `Store with id ${req.params.id} deleted`})
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
    if (!goodsStore) {
      res.status(404).send({msg: `Goods store not found`})
    } else {
      goodsStore.destroy()
      .then(function () {
        res.send({msg: `Good store with id ${goodsStore.id} deleted`})
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

var findStoresWithinRadius = function (location) {

  return new Promise((resolve, reject) => {
    storesModel.findAll({
      where: {}
    })
    .then((stores) => {
      var result = []
      for (var i = 0; i < stores.length; i += 1) {
        var store = stores[i]
        var firstPoint = { lat: location.lat, lng: location.lng }
        var secondPoint = { lat: store.lat_long[0], lng: store.lat_long[1] }
        var storeDistance = distance({
          latitude: firstPoint.lat,
          longitude: firstPoint.lng,
        }, {
          latitude: secondPoint.lat,
          longitude: secondPoint.lng,
        }, { unit: 'meter' })
        if (storeDistance <= MAXIMUM_STORE_RANGE) {
          result.push(store)
        }
      }
      resolve(result)
    })
  })
}

var findStoresGoodsMatchItemsAndLocation = function (items, location) {
  return new Promise((resolve, reject) => {
    var itemIds = _.map(items, 'goodId')
    findStoresWithinRadius(location)
    .then((stores) => {
      var storeIds = _.map(stores, 'id')
      console.log('--------> storeIds: ', storeIds);
      console.log('--------> itemIds: ', itemIds);
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
        if (storesGoodsMatchItems) {
          const goodIds = storesGoodsMatchItems.map((storesGood) => {
            return storesGood.Good.id;
          });

          const differenceIds = _.difference(itemIds, goodIds);
          if (differenceIds.length > 0) {
            goodsModel.findAll({
              where: {
                id: differenceIds,
              },
            })
            .then((goods) => {
              resolve({
                matchStoresGoods: storesGoodsMatchItems,
                unMatchGoods: goods,
              });
            });
          } else {
            resolve({
              matchStoresGoods: storesGoodsMatchItems,
              unMatchGoods: [],
            });
          }
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  });
};

var searchNearbyStore = function (req, res) {
  var requestData = req.body
  var userLocation = requestData.location
  var items = requestData.items

  findStoresGoodsMatchItemsAndLocation(items, userLocation)
  .then((storesGoodsMatchItemsAndLocation) => {

    var unMatchGoods = storesGoodsMatchItemsAndLocation.unMatchGoods.map((good) => {
      return {
        id: good.id,
        name: good.name,
      }
    })

    if (storesGoodsMatchItemsAndLocation.matchStoresGoods.length > 0) {
      var pricingAlgorithm = new PricingAlgorithm(storesGoodsMatchItemsAndLocation.matchStoresGoods, items, userLocation)
      var result = pricingAlgorithm.getOptimizedMatrices()

      result.unMatchGoods = unMatchGoods;
      res.send(result)
    } else {
      res.send({
        unMatchGoods,
      })
    }
    // TODO: possibly async problem
  })
  .catch((err) => {
    res.status(404).send('No store found');
    console.log(err)
  });
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
