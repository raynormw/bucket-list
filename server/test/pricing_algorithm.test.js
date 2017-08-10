const expect = require('chai').expect();

const models = require('../models');

const store = models.Store;
const goods = models.Good;
const storesGoods = models.Stores_Good;

const destroyObjects = () => {
  return new Promise((resolve, reject) => {
    storesGoods.destroy({
      where: {},
    })
    .then(() => {
      goods.destroy({
        where: {},
      })
      .then(() => {
        store.destroy({
          where: {},
        })
        .then(() => {
          resolve();
        });
      });
    })
    .catch((err) => {
      reject(err);
    });
  });
};

const createStoresGoods = (store, goods) => {
  return new Promise((resolve, reject) => {
    storesGoods.create({
      price: 5000,
    })
    .then((createdStoresGood) => {
      createdStoresGood.setStore(store)
      .then(() => {
        createdStoresGood.setGood(goods);
      });
    })
    .catch((err) => {
      reject(err);
    });
  });
};


describe('Testing pricing algorithm', () => {
  beforeEach((done) => {
    destroyObjects()
    .then(() => {
      store.create({
        name: 'Alfamart',
        lat_long: [0.0, 0.0],
      })
      .then((createdStore) => {
        goods.create({
          name: 'Indomie',
          url_pict: '',
        })
        .then((createdGoods) => {
          createStoresGoods(createdStore, createdGoods)
          .then(() => {
            done();
          });
        });
      });
    });
  });

  it('Should list all store goods', (done) => {
    storesGoods.findAll({
      where: {},
    })
    .then((storesGoodsList) => {
      expect(storesGoodsList).to.have.lengthOf(1);
      done();
    });
  });
})
