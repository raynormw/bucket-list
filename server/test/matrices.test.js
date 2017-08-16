const expect = require('chai').expect;

const Matrices = require('../algorithm/matrices');
const Matrix = require('../algorithm/matrix');
const Store = require('../algorithm/store');
const StoresGood = require('../algorithm/stores_good');

const userLocation = { lat: -6.258129, lng: 106.782308 };

describe('Test matrices', () => {

  it('Should optimize stores', (done) => {
    const matrix = new Matrix({
      id: 1,
      userLocation,
    });

    const store1 = new Store({
      id: 1,
      name: 'Store 1',
      location: {
        lat: -6.258129,
        lng: 106.782308,
      },
      _storesGoods: [],
    });
    const storesGood1 = new StoresGood({
      id: 1,
      good: {
        id: 1,
        name: 'Good 1',
      },
      price: 1000,
      quantity: 5,
    });
    const storesGood2 = new StoresGood({
      id: 2,
      good: {
        id: 2,
        name: 'Good 2',
      },
      price: 25000,
      quantity: 5,
    });
    store1.addStoresGood(storesGood1);
    store1.addStoresGood(storesGood2);
    matrix.addStore(store1);

    const store2 = new Store({
      id: 2,
      name: 'Store 2',
      location: {
        lat: -6.262535,
        lng: 106.784161,
      },
      _storesGoods: [],
    });
    const storesGood3 = new StoresGood({
      id: 3,
      good: {
        id: 1,
        name: 'Good 1',
      },
      price: 1000,
      quantity: 5,
    });
    const storesGood4 = new StoresGood({
      id: 4,
      good: {
        id: 2,
        name: 'Good 2',
      },
      price: 5000,
      quantity: 5,
    });
    store2.addStoresGood(storesGood3);
    store2.addStoresGood(storesGood4);
    matrix.addStore(store2);

    const matrices = new Matrices({
      userLocation,
    });

    matrices.addMatrix(matrix);
    matrices.optimizeMatrices();
    console.log(JSON.stringify(matrices.getResult(), null, 2));
    done();
  });
});
