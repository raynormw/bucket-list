const expect = require('chai').expect;

const createStoresGoods = require('./create_stores_goods');
const models = require('../models');

const PricingAlgorithm = require('../algorithm/pricing');

const destroyObjects = () => {
  return new Promise((resolve, reject) => {
    models.Stores_Good.destroy({
      where: {},
    })
    .then(() => {
      models.Good.destroy({
        where: {},
      })
      .then(() => {
        models.Store.destroy({
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

let pricingAlgorithm = null;
const cartItems = [];

describe('Test pricing algorithm', () => {
  beforeEach((done) => {
    destroyObjects()
    .then(() => {
      createStoresGoods()
      .then((storesGoods) => {
        pricingAlgorithm = new PricingAlgorithm(storesGoods, cartItems);
        done();
      });
    });
  });

  it('Should list all store goods', (done) => {
    // models.Stores_Good.findAll({
    //   where: {},
    // })
    // .then((storesGoodsList) => {
    //   expect(storesGoodsList).to.have.lengthOf(2);
    //   done();
    // })
    // .catch((err) => {
    //   done(err);
    // });

    const storesGoods = pricingAlgorithm.getStoresGoods();
    expect(storesGoods).to.have.lengthOf(2);
    done();
  });
});
