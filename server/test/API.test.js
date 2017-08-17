// TODO: Add test for get specific store
var chai = require('chai')
var chaiHttp = require('chai-http')
var hash = require('object-hash')

var should = chai.should()

var server = require('../app')

var storesModel = require('../models').Store
var storesGoodsModel = require('../models').Stores_Good
var goodsModel = require('../models').Good
var membersModel = require('../models').Member

chai.use(chaiHttp)

describe('Checking API', function () {
  before(function () {
    storesModel.destroy({
      where: {},
      truncate: true
    })
    storesGoodsModel.destroy({
      where: {},
      truncate: true
    })
    goodsModel.destroy({
      where: {},
      truncate: true
    })
    membersModel.destroy({
      where: {},
      truncate: true
    })
  })
  after(function () {
    storesModel.destroy({
      where: {},
      truncate: true
    })
    storesGoodsModel.destroy({
      where: {},
      truncate: true
    })
    goodsModel.destroy({
      where: {},
      truncate: true
    })
    membersModel.destroy({
      where: {},
      truncate: true
    })
    console.log(`\n\n\n`);
    console.log(`Coded && Tested With Passion, Love and Sweat \n by Zulfikar Annur Ahmad`);
  })
  describe('Checking /api/stores', function () {
    describe('Checking /api/stores && Add new store, with valid form data (CREATE)', function () {
      it ('Should return status 200', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, res) {
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
        .end(function (err, res) {
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
        .end(function (err, res) {
          res.body.should.not.have.status(500)
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
        .end(function (err, res) {
          res.body.should.have.property('id')
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
        .end(function (err, res) {
          res.body.should.have.property('name')
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
        .end(function (err, res) {
          res.body.should.have.property('lat_long')
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
        .end(function (err, res) {
          res.body.should.have.property('name').that.is.a('string')
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
        .end(function (err, res) {
          res.body.should.have.property('lat_long').that.is.a('array')
        })
        done()
      })
    })

    describe('Checking /api/stores/:id && Add goods in store (CREATE)', function () {
      it('Shoulds return status 200', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              resGoodsStore.body.should.have.status(200)
            })
          })
        })
        done()
      })

      it('Should have not return status 500', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              resGoodsStore.body.should.not.have.status(500)
            })
          })
        })
        done()
      })

      it('Should have price property', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              resGoodsStore.body.should.have.property('price')
            })
          })
        })
        done()
      })

      it('Should have store_id property', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              resGoodsStore.body.should.have.property('store_id')
            })
          })
        })
        done()
      })

      it('Should have good_id property', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              resGoodsStore.body.should.have.property('good_id')
            })
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
        .end(function (err, res) {
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
        .end(function (err, res) {
          res.body.should.be.a('array')
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
        .end(function (err, res) {
          res.body.should.have.lengthOf(3)
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
        .end(function (err, res) {
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
        .end(function (err, res) {
          res.should.have.deep.members([{
            name: 'Toko Bahagia',
            lat_long: [-6.260740, 106.782024]
          }])
        })
        done()
      })
    })

    describe('Checking /api/stores/:id && Get store data correctly (READ)', function () {
      it('Should return status 200', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          chai.get(`/api/stores/${resStore.body.id}`)
          .end(function (err, resGet) {
              resGet.should.have.status(200)
          })
        })
        done()
      })

      it('Should not return status 500', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          chai.get(`/api/stores/${resStore.body.id}`)
          .end(function (err, resGet) {
            resGet.should.not.have.status(500)
          })
        })
        done()
      })

      it('Should have property name', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .get(`/api/stores/${resStore.body.id}`)
          .end(function (err, resGet) {
            resGet.should.have.property('name')
          })
        })
        done()
      })

      it('Should return status lat_long', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .get(`/api/stores/${resStore.body.id}`)
          .end(function (err, resGet) {
            resGet.should.have.property('lat_long')
          })
        })
        done()
      })

      it('Should return status 404, if param is wrong', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .get(`/api/stores/99999999`)
          .end(function (err, resGet) {
            resGet.should.have.status(404)
          })
        })
        done()
      })
    })

    describe('Checking get all goods in a store & association (READ)', function () {
      it('Should return 200', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              chai.request(server)
              .get(`/api/stores/${resStore.body.id}/getgoods`)
              .end(function (err, resGetAllGood) {
                resGetAllGood.should.have.status(200)
              })
            })
          })
        })
        done()
      })

      it('Should include Store model', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              chai.request(server)
              .get(`/api/stores/${resStore.body.id}/getgoods`)
              .end(function (err, resGetAllGood) {
                resGetAllGood.body[0].should.have.property('Store')
              })
            })
          })
        })
        done()
      })

      it('Should include Goods model', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
            desc: 'Saus sambal asli',
            barcode: '8372987183718',
            goods_size: '335 ml'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              chai.request(server)
              .get(`/api/stores/${resStore.body.id}/getgoods`)
              .end(function (err, resGetAllGood) {
                resGetAllGood.body[0].should.have.property('Good')
              })
            })
          })
        })
        done()
      })

      it('Should have Good property that have id', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
            desc: 'Saus sambal asli',
            barcode: '8372987183718',
            goods_size: '335 ml'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              chai.request(server)
              .get(`/api/stores/${resStore.body.id}/getgoods`)
              .end(function (err, resGetAllGood) {
                resGetAllGood.body[0].should.have.property('Good').that.have.property('id')
              })
            })
          })
        })
        done()
      })

      it('Should have Good property that have name', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
            desc: 'Saus sambal asli',
            barcode: '8372987183718',
            goods_size: '335 ml'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              chai.request(server)
              .get(`/api/stores/${resStore.body.id}/getgoods`)
              .end(function (err, resGetAllGood) {
                resGetAllGood.body[0].should.have.property('Good').that.have.property('name')
              })
            })
          })
        })
        done()
      })

      it('Should have Good property that have url_pict', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
            desc: 'Saus sambal asli',
            barcode: '8372987183718',
            goods_size: '335 ml'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              chai.request(server)
              .get(`/api/stores/${resStore.body.id}/getgoods`)
              .end(function (err, resGetAllGood) {
                resGetAllGood.body[0].should.have.property('Good').that.have.property('url_pict')
              })
            })
          })
        })
        done()
      })

      it('Should have Good property that have goods_size', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
            desc: 'Saus sambal asli',
            barcode: '8372987183718',
            goods_size: '335 ml'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              chai.request(server)
              .get(`/api/stores/${resStore.body.id}/getgoods`)
              .end(function (err, resGetAllGood) {
                resGetAllGood.body[0].should.have.property('Good').that.have.property('goods_size')
              })
            })
          })
        })
        done()
      })

      it('Should have Good property that have barcode', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
            desc: 'Saus sambal asli',
            barcode: '8372987183718',
            goods_size: '335 ml'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              chai.request(server)
              .get(`/api/stores/${resStore.body.id}/getgoods`)
              .end(function (err, resGetAllGood) {
                resGetAllGood.body[0].should.have.property('Good').that.have.property('barcode')
              })
            })
          })
        })
        done()
      })

      it('Should have Store property that have name', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
            desc: 'Saus sambal asli',
            barcode: '8372987183718',
            goods_size: '335 ml'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              chai.request(server)
              .get(`/api/stores/${resStore.body.id}/getgoods`)
              .end(function (err, resGetAllGood) {
                resGetAllGood.body[0].should.have.property('Store').that.have.property('name')
              })
            })
          })
        })
        done()
      })

      it('Should have Store property that have lat_long', function (done) {
        chai.request(server)
        .post('/api/stores')
        .send({
          name: 'Toko Bahagia',
          lat_long: [-6.260740, 106.782024]
        })
        .end(function (err, resStore) {
          chai.request(server)
          .post('/api/goods')
          .send({
            name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
            url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
            desc: 'Saus sambal asli',
            barcode: '8372987183718',
            goods_size: '335 ml'
          })
          .end(function (err, resGoods) {
            chai.request(server)
            .post(`/api/stores/${resStore.body.id}/addgoods`)
            .send({
              store_id: `${resStore.body.id}`,
              good_id: `${resGoods.body.id}`,
              price: 15000
            })
            .end(function (err, resGoodsStore) {
              chai.request(server)
              .get(`/api/stores/${resStore.body.id}/getgoods`)
              .end(function (err, resGetAllGood) {
                resGetAllGood.body[0].should.have.property('Good').that.have.property('lat_long')
              })
            })
          })
        })
        done()
      })

    })

    describe('Checking /api/stores && Update stores data (UPDATE)', function () {
      describe('Update specific store', function () {
        it('Should return status 200', function (done) {
          chai.request(server)
          .post('/api/stores')
          .send({
            name: 'Toko Bahagia',
            lat_long: [-6.260740, 106.782024]
          })
          .end(function (err, res) {
            chai.request(server)
            .get('/api/stores')
            .end(function (err, res) {
              chai.request(server)
              .get('/api/stores')
              .end(function (err, res) {
                chai.request(server)
                .put(`/api/stores/${res.body[0].id}`)
                .send({
                  name: 'Toko Senang'
                })
                .end(function (err, res) {
                  res.should.have.status(200)
                })
              })
            })
          })
          done()
        })

        it('Should not return status 500', function (done) {
          chai.request(server)
          .post('/api/stores')
          .send({
            name: 'Toko Bahagia',
            lat_long: [-6.260740, 106.782024]
          })
          .end(function (err, res) {
            chai.request(server)
            .get('/api/stores')
            .end(function (err, res) {
              chai.request(server)
              .get('/api/stores')
              .end(function (err, res) {
                chai.request(server)
                .put(`/api/stores/${res.body[0].id}`)
                .send({
                  name: 'Toko Senang'
                })
                .end(function (err, res) {
                  res.should.not.have.status(500)
                })
              })
            })
          })
          done()
        })
        //
        // it('Should preserve value when updated with empty value', function (done) {
        //   chai.request(server)
        //   .post('/api/stores')
        //   .send({
        //     name: 'Toko Bahagia',
        //     lat_long: [-6.260740, 106.782024]
        //   })
        //   .end(function (err, res) {
        //     chai.request(server)
        //     .get('/api/stores')
        //     .end(function (err, res) {
        //       chai.request(server)
        //       .get('/api/stores')
        //       .end(function (err, res) {
        //         chai.request(server)
        //         .put(`/api/stores/${res.body[0].id}`)
        //         .send({
        //           name: null,
        //           lat_long: null
        //         })
        //         .end(function (err, res) {
        //           res.should.be.a('object')
        //           done()
        //         })
        //       })
        //     })
        //   })
        // })
        //
        it('Should only change name value if only name value updated', function (done) {
          chai.request(server)
          .post('/api/stores')
          .send({
            name: 'Toko Bahagia',
            lat_long: [-6.260740, 106.782024]
          })
          .end(function (err, res) {
            chai.request(server)
            .get('/api/stores')
            .end(function (err, res) {
              chai.request(server)
              .get('/api/stores')
              .end(function (err, res) {
                chai.request(server)
                .put(`/api/stores/${res.body[0].id}`)
                .send({
                  name: 'Toko Senang',
                  lat_long: null
                })
                .end(function (err, res) {
                  res.body.should.have.property('name').equal('Toko Senang')
                })
              })
            })
          })
          done()
        })
        //
        it('Should only lat_long value if only lat_long value updated', function (done) {
          chai.request(server)
          .post('/api/stores')
          .send({
            name: 'Toko Bahagia',
            lat_long: [-6.260740, 106.782024]
          })
          .end(function (err, res) {
            chai.request(server)
            .get('/api/stores')
            .end(function (err, res) {
              chai.request(server)
              .get('/api/stores')
              .end(function (err, res) {
                chai.request(server)
                .put(`/api/stores/${res.body[0].id}`)
                .send({
                  lat_long: [-6.185697, 106.810886]
                })
                .end(function (err, res) {
                  res.body.should.have.property('lat_long')
                  res.body.lat_long[0].should.equal('-6.185697')
                })
              })
            })
          })
          done()
        })
        //
        it('Update name and lat_long value if both name and lat_long value updated', function (done) {
          chai.request(server)
          .post('/api/stores')
          .send({
            name: 'Toko Bahagia',
            lat_long: [-6.260740, 106.782024]
          })
          .end(function (err, res) {
            chai.request(server)
            .get('/api/stores')
            .end(function (err, res) {
              chai.request(server)
              .get('/api/stores')
              .end(function (err, res) {
                chai.request(server)
                .put(`/api/stores/${res.body[0].id}`)
                .send({
                  name: 'Toko Senang',
                  lat_long: [-6.185697, 106.810886]
                })
                .end(function (err, res) {
                  res.body.should.have.property('lat_long')
                  res.body.should.have.property('name').equal('Toko Senang')
                  res.body.lat_long[0].should.equal('-6.185697')
                })
              })
            })
          })
          done()
        })
      })
    })

    describe('Checking /api/stores && Delete store data (DELETE)', function () {
      describe('Delete specific store', function () {
        it('Should return status 200', function (done) {
          chai.request(server)
          .post('/api/stores')
          .send({
            name: 'Toko Bahagia',
            lat_long: [-6.260740, 106.782024]
          })
          .end(function (err, res) {
            chai.request(server)
            .delete(`/api/stores/${res.body[0].id}`)
            .end(function (err, resDel) {
              resDel.should.have.status(200)
            })
          })
          done()
        })

        it('Should not return status 500', function (done) {
          chai.request(server)
          .post('/api/stores')
          .send({
            name: 'Toko Bahagia',
            lat_long: [-6.260740, 106.782024]
          })
          .end(function (err, res) {
            chai.request(server)
            .delete(`/api/stores/${res.body[0].id}`)
            .end(function (err, resDel) {
              resDel.should.not.have.status(500)
            })
          })
          done()
        })

        it('Should return status 404 if params accessed', function (done) {
          chai.request(server)
          .post('/api/stores')
          .send({
            name: 'Toko Bahagia',
            lat_long: [-6.260740, 106.782024]
          })
          .end(function (err, res) {
            chai.request(server)
            .delete(`/api/stores/${res.body[0].id}`)
            .end(function (err, resDel) {
              chai.request(server)
              .get(`/api/stores/${res.body[0].id}`)
              .end(function (err, resGet) {
                resGet.should.have.status(404)
              })
            })
          })
          done()
        })
      })

      describe('Delete goods from store', function () {
        it('Should return status 200', function (done) {
          chai.request(server)
          .post('/api/stores')
          .send({
            name: 'Toko Bahagia',
            lat_long: [-6.260740, 106.782024]
          })
          .end(function (err, resStore) {
            chai.request(server)
            .post('/api/goods')
            .send({
              name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
              url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
              desc: 'Saus sambal asli',
              barcode: '8372987183718',
              goods_size: '335 ml'
            })
            .end(function (err, resGoods) {
              chai.request(server)
              .post(`/api/stores/${resStore.body.id}/addgoods`)
              .send({
                store_id: `${resStore.body.id}`,
                good_id: `${resGoods.body.id}`,
                price: 15000
              })
              .end(function (err, resGoodsStore) {
                chai.request(server)
                .delete(`/api/stores/${resStore.body.id}/${resGoods.body.id}`)
                .end(function (err, resDelGoodStore) {
                  resDelGoodStore.should.have.status(200)
                })
              })
            })
          })
          done()
        })

        it('Should not return status 500', function (done) {
          chai.request(server)
          .post('/api/stores')
          .send({
            name: 'Toko Bahagia',
            lat_long: [-6.260740, 106.782024]
          })
          .end(function (err, resStore) {
            chai.request(server)
            .post('/api/goods')
            .send({
              name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
              url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
              desc: 'Saus sambal asli',
              barcode: '8372987183718',
              goods_size: '335 ml'
            })
            .end(function (err, resGoods) {
              chai.request(server)
              .post(`/api/stores/${resStore.body.id}/addgoods`)
              .send({
                store_id: `${resStore.body.id}`,
                good_id: `${resGoods.body.id}`,
                price: 15000
              })
              .end(function (err, resGoodsStore) {
                chai.request(server)
                .delete(`/api/stores/${resStore.body.id}/${resGoods.body.id}`)
                .end(function (err, resDelGoodStore) {
                  resDelGoodStore.should.not.have.status(500)
                })
              })
            })
          })
          done()
        })
      })
    })
  })

  describe('Checking /api/goods', function () {
    before(function () {
      storesModel.destroy({
        where: {},
        truncate: true
      })
      storesGoodsModel.destroy({
        where: {},
        truncate: true
      })
      goodsModel.destroy({
        where: {},
        truncate: true
      })
    })

    after(function () {
      storesModel.destroy({
        where: {},
        truncate: true
      })
      storesGoodsModel.destroy({
        where: {},
        truncate: true
      })
      goodsModel.destroy({
        where: {},
        truncate: true
      })
    })

    describe('Create Goods with complete form data (CREATE)', function () {
      it('Should return status 200', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          desc: 'Saus sambal asli',
          barcode: '8372987183718',
          goods_size: '335 ml'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.status(200)
        })
        done()
      })

      it('Should not return status 500', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          desc: 'Saus sambal asli',
          barcode: '8372987183718',
          goods_size: '335 ml'
        })
        .end(function (err, resGoods) {
          resGoods.should.not.have.status(500)
        })
        done()
      })
    })

    describe('Create Goods without url_pict', function () {
      it('Should return status 200', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          desc: 'Saus sambal asli',
          barcode: '8372987183718',
          goods_size: '335 ml'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.status(200)
        })
        done()
      })

      it('Should not return status 500', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          desc: 'Saus sambal asli',
          barcode: '8372987183718',
          goods_size: '335 ml'
        })
        .end(function (err, resGoods) {
          resGoods.should.not.have.status(200)
        })
        done()
      })
    })

    describe('Create Goods without goods_size', function () {
      it('Should return status 200', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          desc: 'Saus sambal asli',
          barcode: '8372987183718'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.status(200)
        })
        done()
      })

      it('Should not return status 500', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          desc: 'Saus sambal asli',
          barcode: '8372987183718'
        })
        .end(function (err, resGoods) {
          resGoods.should.not.have.status(500)
        })
        done()
      })
    })

    describe('Create Goods without barcode', function () {
      it('Should return status 200', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          desc: 'Saus sambal asli',
          goods_size: '335 ml'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.status(200)
        })
        done()
      })

      it('Should not return status 500', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          desc: 'Saus sambal asli',
          goods_size: '335 ml'
        })
        .end(function (err, resGoods) {
          resGoods.should.not.have.status(500)
        })
        done()
      })
    })

    describe('Create Goods without barcode && goods_size', function () {
      it('Should return status 200', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          desc: 'Saus sambal asli'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.status(200)
        })
        done()
      })

      it('Should not return status 500', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          desc: 'Saus sambal asli'
        })
        .end(function (err, resGoods) {
          resGoods.should.not.have.status(500)
        })
        done()
      })
    })

    describe('Create Goods without barcode && url_pict', function () {
      it('Should return status 200', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          desc: 'Saus sambal asli',
          goods_size: '335 ml'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.status(200)
        })
        done()
      })

      it('Should not return status 500', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          desc: 'Saus sambal asli',
          goods_size: '335 ml'
        })
        .end(function (err, resGoods) {
          resGoods.should.not.have.status(500)
        })
        done()
      })
    })

    describe('Create Goods without goods_size && url_pict', function () {
      it('Should return status 200', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          desc: 'Saus sambal asli',
          barcode: '8372987183718'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.status(200)
        })
        done()
      })

      it('Should not return status 500', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          desc: 'Saus sambal asli',
          barcode: '8372987183718'
        })
        .end(function (err, resGoods) {
          resGoods.should.not.have.status(500)
        })
        done()
      })
    })

    describe('Create Goods without desc', function () {
      it('Should have status 200', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          barcode: '8372987183718',
          goods_size: '335 ml'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.status(200)
        })
        done()
      })

      it('Should not have status 500', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          barcode: '8372987183718',
          goods_size: '335 ml'
        })
        .end(function (err, resGoods) {
          resGoods.should.not.have.status(500)
        })
        done()
      })
    })

    describe('Create Goods without desc && goods_size',function () {
      it('Should have status 200', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          barcode: '8372987183718'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.status(200)
        })
        done()
      })

      it('Should not have status 500', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg',
          barcode: '8372987183718'
        })
        .end(function (err, resGoods) {
          resGoods.should.not.have.status(500)
        })
        done()
      })
    })

    describe('Create Goods without desc && goods_size && url_pict', function () {
      it('Should have status 200', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          barcode: '8372987183718'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.status(200)
        })
        done()
      })

      it('Should not have status 500', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          barcode: '8372987183718'
        })
        .end(function (err, resGoods) {
          resGoods.should.not.have.status(500)
        })
        done()
      })
    })

    describe('Create Goods without desc && goods_size && url_pict && barcode', function () {
      it('Should have status 200', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.status(200)
        })
        done()
      })

      it('Should not have status 500', function (done) {
        chai.request(server)
        .post('/api/goods')
        .send({
          name: 'Saus Sambal Asli Abc 335 ML (Botol Beling)',
          url_pict: 'https://ecs7.tokopedia.net/img/product-1/2017/3/21/1163717/1163717_40dacd13-553a-4500-9fda-4818a705552c.jpg'
        })
        .end(function (err, resGoods) {
          resGoods.should.have.not.status(500)
        })
        done()
      })
    })
  })

  // describe('Checking /api/baskets', function () {
  //
  // })
  //
  describe('Checking /api/members', function () {
    describe('Sign Up', function () {
      it('Should return status 200', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, res) {
          res.should.have.status(200)
        })
        done()
      })

      it('Should not return status 500', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, res) {
          res.should.not.have.status(500)
        })
        done()
      })

      it('Should hashed input password', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, res) {
          res.body[0].password.should.not.equal('testpassword')
        })
        done()
      })

      it('Should have property name', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, res) {
          res.body[0].should.have.property('name')
        })
        done()
      })

      it('Should have property email', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, res) {
          res.body[0].should.have.property('email')
        })
        done()
      })

      it('Should have property password', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, res) {
          res.body[0].should.have.property('password')
        })
        done()
      })
    })

    describe('Sign In', function () {
      beforeEach(function () {
        membersModel.destroy({
          where: {},
          truncate: true
        })
      })

      it('Should return status 200 if correct', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resUp) {
          chai.request(server)
          .post('/api/members/signin')
          .send({
            email: 'Test@mail.com',
            password: 'testpassword'
          })
          .end(function (err, resIn) {
            resIn.should.have.status(200)
          })
        })
        done()
      })

      it('Should have property token if correct', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resUp) {
          chai.request(server)
          .post('/api/members/signin')
          .send({
            email: 'Test@mail.com',
            password: 'testpassword'
          })
          .end(function (err, resIn) {
            resIn.body[0].should.have.property('token')
          })
        })
        done()
      })

      it('Should return status 404 if email not found', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resUp) {
          chai.request(server)
          .post('/api/members/signin')
          .send({
            email: 'Testdhajdhasjd@mail.com',
            password: 'testpassword'
          })
          .end(function (err, resIn) {
            resIn.should.have.status(404)
          })
        })
        done()
      })
    })

    describe('Get all member', function () {
      beforeEach(function () {
        membersModel.destroy({
          where: {},
          truncate: true
        })
      })

      it('Should be a array', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .send({
          name: 'Test SignUp1',
          email: 'Test1@mail.com',
          password: hash('testpassword')
        })
        .send({
          name: 'Test SignUp2',
          email: 'Test2@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .get('/api/members')
          .end(function (err, resGet) {
            resGet.body[0].should.be.a('array')
          })
        })
        done()
      })

      it('Should have status 200', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .send({
          name: 'Test SignUp1',
          email: 'Test1@mail.com',
          password: hash('testpassword')
        })
        .send({
          name: 'Test SignUp2',
          email: 'Test2@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .get('/api/members')
          .end(function (err, resGet) {
            resGet.should.have.status(200)
          })
        })
        done()
      })

      it('Should not return status 500', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .send({
          name: 'Test SignUp1',
          email: 'Test1@mail.com',
          password: hash('testpassword')
        })
        .send({
          name: 'Test SignUp2',
          email: 'Test2@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .get('/api/members')
          .end(function (err, resGet) {
            resGet.should.not.have.status(500)
          })
        })
        done()
      })

      it('Should have length 3', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .send({
          name: 'Test SignUp1',
          email: 'Test1@mail.com',
          password: hash('testpassword')
        })
        .send({
          name: 'Test SignUp2',
          email: 'Test2@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .get('/api/members')
          .end(function (err, resGet) {
            resGet.body[0].should.have.lengthOf(3)
          })
        })
        done()
      })
    })

    describe('Delete member', function () {
      beforeEach(function () {
        membersModel.destroy({
          where: {},
          truncate: true
        })
      })

      it('Should return status 200 if deleted', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .delete(`/api/members/${resCreate.id}/delete`)
          .end(function (err, resDel) {
            resDel.should.have.status(200)
          })
        })
        done()
      })

      it('Should return status 404 if not found', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .delete(`/api/members/100000/delete`)
          .end(function (err, resDel) {
            resDel.should.have.status(404)
          })
        })
        done()
      })

      it('Should not return status 500 if deleted',function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .delete(`/api/members/${resCreate.id}/delete`)
          .end(function (err, resDel) {
            resDel.should.have.not.status(500)
          })
        })
        done()
      })
    })

    describe('Update member', function () {
      beforeEach(function () {
        membersModel.destroy({
          where: {},
          truncate: true
        })
      })

      it('Should return 200 if name updated', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .put(`/api/members/${resCreate.id}/update`)
          .send({
            name: 'Update'
          })
          .end(function (err, resUpd) {
            resUpd.should.have.status(200)
          })
        })
        done()
      })

      it('Should not return 500 if name updated', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .put(`/api/members/${resCreate.id}/update`)
          .send({
            name: 'Update'
          })
          .end(function (err, resUpd) {
            resUpd.should.not.have.status(500)
          })
        })
        done()
      })

      it('Should return 200 if email updated', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .put(`/api/members/${resCreate.id}/update`)
          .send({
            email: 'Update@mail.com'
          })
          .end(function (err, resUpd) {
            resUpd.should.have.status(200)
          })
        })
        done()
      })

      it('Should not return 500 if email updated', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .put(`/api/members/${resCreate.id}/update`)
          .send({
            email: 'Update@mail.com'
          })
          .end(function (err, resUpd) {
            resUpd.should.not.have.status(500)
          })
        })
        done()
      })

      it('Should return 200 if email password updated', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .put(`/api/members/${resCreate.id}/update`)
          .send({
            password: 'Update'
          })
          .end(function (err, resUpd) {
            resUpd.should.have.status(200)
          })
        })
        done()
      })

      it('Should not return 500 if email password updated', function (done) {
        chai.request(server)
        .post('/api/members/signup')
        .send({
          name: 'Test SignUp',
          email: 'Test@mail.com',
          password: hash('testpassword')
        })
        .end(function (err, resCreate) {
          chai.request(server)
          .put(`/api/members/${resCreate.id}/update`)
          .send({
            password: 'Update'
          })
          .end(function (err, resUpd) {
            resUpd.should.have.not.status(500)
          })
        })
        done()
      })
    })
  })

  describe('Checking /api/goods/searchgoods (MVP)', function () {
    beforeEach(function () {
      goodsModel.destroy({
        where: {},
        truncate: true
      })
    })

    it('Should return status 200', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'Beras'
        })
        .end(function (err, resSearch) {
          resSearch.should.have.status(200)
        })
      })
      done()
    })

    it('Should return array', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'Beras'
        })
        .end(function (err, resSearch) {
          resSearch.body[0].should.be.a('array')
        })
      })
      done()
    })

    it('Should return array of 1 with query minyak', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'Minyak'
        })
        .end(function (err, resSearch) {
          resSearch.body[0].should.have.lengthOf(1)
        })
      })
      done()
    })

    it('Should return array of 3 with query a', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'a'
        })
        .end(function (err, resSearch) {
          resSearch.body[0].should.have.lengthOf(3)
        })
      })
      done()
    })

    it('Should return status 200 with query a', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'a'
        })
        .end(function (err, resSearch) {
          resSearch.should.have.status(200)
        })
      })
      done()
    })

    it('Should not return status 500 with query a', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'a'
        })
        .end(function (err, resSearch) {
          resSearch.should.have.not.status(500)
        })
      })
      done()
    })

    it('Should return array of 2 with query beras', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'Beras'
        })
        .end(function (err, resSearch) {
          resSearch.body[0].should.have.lengthOf(2)
        })
      })
      done()
    })

    it('Should return status 200 with query beras', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'Beras'
        })
        .end(function (err, resSearch) {
          resSearch.should.have.status(200)
        })
      })
      done()
    })

    it('Should not return status 500 with query beras', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'Beras'
        })
        .end(function (err, resSearch) {
          resSearch.should.have.not.status(500)
        })
      })
      done()
    })

    it('Should return array of 0 with random query', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'Random'
        })
        .end(function (err, resSearch) {
          resSearch.body[0].should.have.lengthOf(0)
        })
      })
      done()
    })

    it('Should have not status 404 with random query', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'Random'
        })
        .end(function (err, resSearch) {
          resSearch.should.have.not.status(404)
        })
      })
      done()
    })

    it('Should return status 200 with random query', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'Random'
        })
        .end(function (err, resSearch) {
          resSearch.should.have.status(200)
        })
      })
      done()
    })

    it('Should not return status 500 with random query', function (done) {
      chai.request(server)
      .post('/api/goods')
      .send({
        name: 'Minyak Goreng Bimoli'
      })
      .send({
        name: 'Beras Rojolele'
      })
      .send({
        name: 'Beras IR64'
      })
      .end(function (err, res) {
        chai.request(server)
        .post('/api/goods/searchgoods')
        .send({
          query: 'Random'
        })
        .end(function (err, resSearch) {
          resSearch.should.have.not.status(500)
        })
      })
      done()
    })
  })
})
