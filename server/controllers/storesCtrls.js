var storesModel = require('../models').Store

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

var getAllStores = function (req,res) {
  storesModel.findAll({})
  .then(function (stores) {
    res.send(stores)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

module.exports = {
  addStore,
  getAllStores
}
