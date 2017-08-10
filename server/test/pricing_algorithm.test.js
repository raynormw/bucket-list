const expect = require('chai').expect;

const createStoresGoods = require('./create_stores_goods');
const models = require('../models');

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

describe('Test pricing algorithm', () => {
  beforeEach((done) => {
    destroyObjects()
    .then(() => {
      createStoresGoods()
      .then((storesGoods) => {
        done();
      });
    });
  });

  it('Should list all store goods', (done) => {
    models.Stores_Good.findAll({
      where: {},
    })
    .then((storesGoodsList) => {
      expect(storesGoodsList).to.have.lengthOf(1);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });
});
