// TODO: Add test for get specific store
var chai = require('chai')
var chaiHttp = require('chai-http')

var should = chai.should()

var server = require('../app')

var storesModel = require('../models').Store
var storesGoodsModel = require('../models').Stores_Good
var goodsModel = require('../models').Good
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
            resGoodsStore.should.have.status(200)
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
            resGoodsStore.should.not.have.status(500)
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
            done()
          })
        })
      })
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
            done()
          })
        })
      })
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
            done()
          })
        })
      })
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

    })

    it('Should include Goods model', function (done) {

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

  // describe('Checking /api/stores && Delete store data (DELETE)', function () {
  //   describe('Delete specific store', function () {
  //
  //   })
  //
  //   describe('Delete goods from store', function () {
  //
  //   })
  // })
})
