// TODO: Add test for get specific store
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
  describe('Checking /api/stores && Add new store, with valid form data (CREATE)', function () {
    it ('Should return status 200', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .end(function (res) {
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
        storesModel.destroy({
            where: {
              name: 'Toko Bahagia'
            }
          })
          .then(function (result) {
            console.log('Deleted rows : ' + result)
            done()
          })
          .catch(function (err) {
            console.log('Error hook : ' + err)
          })
      })
      done()
    })
  })

  describe('Checking /api/stores && Get all store data correctly (READ)', function () {

    it('Should return status 200', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .send({
        name: 'Toko Berkah',
        lat_long: [-6.175328, 106.827153]
      })
      .send({
        name: 'Toko Serba Ada',
        lat_long: [-6.185697, 106.810886]
      })
      chai.request(server)
      .get('/api/stores')
      .end(function (res) {
        storesModel.destroy({
          where: {
            name: ['Toko Bahagia','Toko Berkah','Toko Serba Ada']
          }
        })
        .then(function (deleted) {
          console.log('Deleetd rows: ' + deleted)
        })
        .catch(function (err) {
          console.log(err);
        })
        res.should.have.status(200)
      })
      done()
    })

    it('Should return array', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .send({
        name: 'Toko Berkah',
        lat_long: [-6.175328, 106.827153]
      })
      .send({
        name: 'Toko Serba Ada',
        lat_long: [-6.185697, 106.810886]
      })
      chai.request(server)
      .get('/api/stores')
      .end(function (res) {
        storesModel.destroy({
          where: {
            name: ['Toko Bahagia','Toko Berkah','Toko Serba Ada']
          }
        })
        .then(function (deleted) {
          console.log('Deleetd rows: ' + deleted)
        })
        .catch(function (err) {
          console.log(err);
        })
        res.should.be.a('array')
      })
      done()
    })

    it('Should have length of 3', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .send({
        name: 'Toko Berkah',
        lat_long: [-6.175328, 106.827153]
      })
      .send({
        name: 'Toko Serba Ada',
        lat_long: [-6.185697, 106.810886]
      })
      chai.request(server)
      .get('/api/stores')
      .end(function (res) {
        storesModel.destroy({
          where: {
            name: ['Toko Bahagia','Toko Berkah','Toko Serba Ada']
          }
        })
        .then(function (deleted) {
          console.log('Deleetd rows: ' + deleted)
        })
        .catch(function (err) {
          console.log(err);
        })
        res.should.have.lengthOf(3)
      })
      done()
    })

    it('Should not have length of 4', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .send({
        name: 'Toko Berkah',
        lat_long: [-6.175328, 106.827153]
      })
      .send({
        name: 'Toko Serba Ada',
        lat_long: [-6.185697, 106.810886]
      })
      chai.request(server)
      .get('/api/stores')
      .end(function (res) {
        storesModel.destroy({
          where: {
            name: ['Toko Bahagia','Toko Berkah','Toko Serba Ada']
          }
        })
        .then(function (deleted) {
          console.log('Deleetd rows: ' + deleted)
        })
        .catch(function (err) {
          console.log(err);
        })
        res.should.not.have.lengthOf(4)
      })
      done()
    })

    it('Should have specific member', function (done) {
      chai.request(server)
      .post('/api/stores')
      .send({
        name: 'Toko Bahagia',
        lat_long: [-6.260740, 106.782024]
      })
      .send({
        name: 'Toko Berkah',
        lat_long: [-6.175328, 106.827153]
      })
      .send({
        name: 'Toko Serba Ada',
        lat_long: [-6.185697, 106.810886]
      })
      chai.request(server)
      .get('/api/stores')
      .end(function (res) {
        storesModel.destroy({
          where: {
            name: ['Toko Bahagia','Toko Berkah','Toko Serba Ada']
          }
        })
        .then(function (deleted) {
          console.log('Deleetd rows: ' + deleted)
        })
        .catch(function (err) {
          console.log(err);
        })
        res.should.have.deep.members([{
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        }])
      })
      done()
    })
  })

  describe('Checking /api/stores && Update stores data (UPDATE)', function () {
    describe('Update specific store', function () {
      it('Should return status 200', function (done) {

      })

      it('Should not return status 500', function (done) {

      })

      it('Should preserve value when updated with empty value', function (done) {

      })

      it('Should only change name value if only name value updated', function (done) {

      })

      it('Should only lat_long value if only lat_long value updated', function (done) {

      })

      it('Update name and lat_long value if both name and lat_long value updated', function (done) {

      })
    })
  })

  describe('Checking /api/stores && Delete store data (DELETE)', function () {
    describe('Delete specific store', function () {

    })

    describe('Delete goods from store', function () {

    })
  })
})
