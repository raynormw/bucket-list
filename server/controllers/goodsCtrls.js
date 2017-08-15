var goodsModel = require('../models').Good

var addGoods = function (req, res) {
  console.log(req.body.goods_size)
  goodsModel.create({
    name: req.body.name,
    url_pict: req.body.url_pict,
    barcode: req.body.barcode,
    goods_size: req.body.goods_size
  })
  .then(function (result) {
    res.send(result)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getAllGoods = function (req, res) {
  goodsModel.findAll()
  .then(function (goods) {
    res.send(goods)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var updateGoods = function (req, res) {
  goodsModel.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (goods) {
    if (!goods) {
      res.send({msg: `Goods with id ${req.params.id} not found`})
    } else {
      goodsModel.update({
        name: req.body.name || goods.name,
        url_pict: req.body.url_pict || goods.url_pict,
        barcode: req.body.barcode || goods.barcode,
        goods_size: req.body.goods_size || goods.goods_size
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(function () {
        res.send({msg: 'Update sucess'})
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

var deleteGoods = function (req, res) {
  goodsModel.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function (goods) {
    if (!goods) {
      res.send({msg: `Goods with id ${req.params.id} not found`})
    } else {
      goods.destroy()
      .then(function () {
        res.send({msg: `Goods with id ${req.params.id} deleted`})
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

var searchGoods = function (req, res) {
  goodsModel.findAll({
    where: {
      name: {
        $iLike: `%${req.body.query}%`
      }
    }
  })
  .then(function (goodsResult) {
    if (!goodsResult) {
      res.status(404).send({msg: `Goods with query ${req.body.query} not found`})
    } else {
      res.send(goodsResult)
    }
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}
module.exports = {
  addGoods,
  getAllGoods,
  updateGoods,
  deleteGoods,
  searchGoods
}
