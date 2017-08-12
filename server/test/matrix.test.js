const expect = require('chai').expect;

const Matrix = require('../algorithm/matrix');
const Store = require('../algorithm/store');
const StoresGood = require('../algorithm/stores_good');

const options = {
  id: 1,
  _stores: [],
};

const storeOptions = {
  id: 1,
  name: 'A Store',
  location: {
    lat: -6.16074,
    lng: 106.582024,
  },
  _storesGoods: [],
};

const storesGoodOptions = {
  id: 1,
  good: {
    id: 1,
    name: 'A Good',
  },
  price: 1000,
  quantity: 10,
  _selected: true,
};

describe('Test matrix', () => {
  it('Should store correct properties', (done) => {

    const matrix = new Matrix(options);
    expect(matrix).to.eql(options);
    done();
  });

  it('Should return correct total', (done) => {
    const matrix = new Matrix(options);

    const store = new Store(options);
    const storesGood = new StoresGood(storesGoodOptions);
    store.addStoresGood(storesGood);
    matrix.addStore(store);
    const total = matrix.getTotal();
    expect(total).to.eql(10000);
    done();
  });
});
