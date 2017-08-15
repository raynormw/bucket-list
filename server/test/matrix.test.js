const expect = require('chai').expect;

const Matrix = require('../algorithm/matrix');
const Store = require('../algorithm/store');
const StoresGood = require('../algorithm/stores_good');

const options = {
  id: 1,
  userLocation: { lat: -6.260740, long: 106.782024 },
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

const storesGoodOptions1 = {
  id: 1,
  good: {
    id: 1,
    name: 'Good 1',
  },
  price: 1000,
  quantity: 10,
  _selected: true,
};

const storesGoodOptions2 = {
  id: 2,
  good: {
    id: 2,
    name: 'Good 2',
  },
  price: 5000,
  quantity: 5,
  _selected: true,
};

describe('Test matrix', () => {
  it('Should store correct properties', (done) => {

    const matrix = new Matrix(options);
    expect(matrix).to.eql({
      id: options.id,
      _stores: [],
      _userLocation: options.userLocation,
    });
    done();
  });

  it('Should return correct total', (done) => {
    const matrix = new Matrix(options);

    const store = new Store(storeOptions);
    const storesGood1 = new StoresGood(storesGoodOptions1);
    const storesGood2 = new StoresGood(storesGoodOptions2);
    store.addStoresGood(storesGood1);
    store.addStoresGood(storesGood2);
    matrix.addStore(store);
    const total = matrix.getTotal();
    expect(total).to.eql(75000);
    done();
  });

  it('Should return correct total from stores', (done) => {
    const matrix = new Matrix(options);

    const store = new Store(storeOptions);
    const storesGood1 = new StoresGood(storesGoodOptions1);
    const storesGood2 = new StoresGood(storesGoodOptions2);
    store.addStoresGood(storesGood1);
    store.addStoresGood(storesGood2);
    matrix.addStore(store);
    const total = matrix.getTotalFromStores();
    expect(total).to.eql(75000);
    done();
  });
});
