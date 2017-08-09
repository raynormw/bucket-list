var chai = require('chai')
var chaiHttp = require('chai-http')

var should = chai.should()

var server = require('../app')

var storesModel = require('../models').Store
var storesGoodsModel = require('../models/stores_good')
var goodsModel = require('../models/good')
var cartsModel = require('../models/cart')
var cartsItemModel = require('../models/carts_item')
var membersModel = require('../models/member')
var adminModel = require('../models/admin')

chai.use(chaiHttp)

describe('Checking /api/stores', function () {
  describe('Add new store, with valid form data (CREATE)', function () {

    beforeEach('Purge all data in stores model', function (done) {
      storesModel.destroy({
        where: {
          name: 'Toko Bahagia'
        }
      })
      .then(function (result) {
        console.log('Deleted rows : ' + result)
      })
      .catch(function (err) {
        console.log('Error hook : ' + err)
      })
      done()
    })

    it ('Should return status 200', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .end(function (res) {
        res.should.have.status(200)
      })
      done()
    })

    it ('Should return object', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .end(function (res) {
        res.should.be.a('object')
      })
      done()
    })

    it ('Should not return status 500', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .end(function (res) {
        res.should.not.have.status(500)
      })
      done()
    })

    it ('Should have property id', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .end(function (res) {
        res.should.have.property('id')
      })
      done()
    })

    it ('Should have property name', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .end(function (res) {
        res.should.have.property('name')
      })
      done()
    })

    it ('Should have property lat_long', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .end(function (res) {
        res.should.have.property('lat_long')
      })
      done()
    })

    it ('Name key should be string type value', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .end(function (res) {
        res.should.have.property('name').that.is.a('string')
      })
      done()
    })

    it ('lat_long key should be array type value', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .end(function (res) {
        res.should.have.property('lat_long').that.is.a('array')
      })
      done()
    })
  })
  describe('Get all store data correctly (READ)', function () {
    beforeEach('Seed data', function (done) {
      storesModel.bulkCreate([
        {
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        },
        {
          name: 'Toko Berkah',
          lat_long: [-6.175328, 106.827153]
        },
        {
          name: 'Toko Serba Ada',
          lat_long: [-6.185697, 106.810886]
        }
      ])
      .then(function () {
        return storesModel.findAll()
      })
      .then(function (stores) {
        console.log('Seeding data with these value' + stores)
      })
      .catch(function (err) {
        console.log(err)
      })
      done()
    })

    afterEach('Purge all data', function (done) {
      storesModel.destroy({
        where: {
          name: ['Toko Bahagia','Toko Berkah','Toko Serba Ada']
        }
      })
      .then(function (result) {
        console.log('Deleted rows : ' + result)
      })
      .catch(function (err) {
        console.log('Error hook : ' + err)
      })
      done()
    })

    it('Should return status 200', function (done) {
      chai.request(server)
      .get('/api/stores')
      .end(function (res) {
        res.should.have.status(200)
      })
      done()
    })

    it('Should return array', function (done) {
      chai.request(server)
      .get('/api/stores')
      .end(function (res) {
        res.should.be.a('array')
      })
      done()
    })

    it('Should have length of 3', function (done) {
      chai.request(server)
      .get('/api/stores')
      .end(function (res) {
        res.should.have.lengthOf(3)
      })
      done()
    })

    it('Should not have length of 4', function (done) {
      chai.request(server)
      .get('/api/stores')
      .end(function (res) {
        res.should.not.have.lengthOf(4)
      })
      done()
    })

    it('Should have specific member', function (done) {
      chai.request(server)
      .get('/api/stores')
      .end(function (res) {
        res.should.have.deep.members([{
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        }])
      })
      done()
    })
  })
})
