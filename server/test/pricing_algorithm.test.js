const expect = require('chai').expect;
const _ = require('lodash');

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
const cartItems = [
  {
    id: 1,
    goodId: 1,
    quantity: 10,
  },
  {
    id: 2,
    goodId: 2,
    quantity: 5,
  },
];

describe('Test pricing algorithm', () => {
  beforeEach((done) => {
    destroyObjects()
    .then(() => {
      createStoresGoods()
      .then((storesGoods) => {

        const itemIds = _.map(cartItems, 'goodId');
        models.Stores_Good.findAll({
          where: {
          },
          include: [
            {
              model: models.Good,
              where: {
                id: itemIds,
              },
            },
            {
              model: models.Store,
            },
          ],
        })
        .then((storesGoodsMatchItems) => {
          pricingAlgorithm = new PricingAlgorithm(
            storesGoodsMatchItems,
            cartItems,
            { lat: -6.261580, lng: 106.782640 });
          done();
        });
      });
    });
  });

  it('Should list all store goods match items', (done) => {
    const storesGoods = pricingAlgorithm.getStoresGoods();
    expect(storesGoods).to.have.lengthOf(3);
    done();
  });

  it('Should optimize matrices', (done) => {
    const optimizedMatrices = pricingAlgorithm.getOptimizedMatrices();
    console.log('------------> optimizedMatrices: ', JSON.stringify(optimizedMatrices, null, 2));
    expect(optimizedMatrices.mostOptimizedMatrix.storesOptimizedTotalWithDistance).to.eql(94994.15);
    done();
  });
});
