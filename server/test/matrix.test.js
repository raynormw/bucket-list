const expect = require('chai').expect;

const Matrix = require('../algorithm/matrix');
const Store = require('../algorithm/store');
const StoresGood = require('../algorithm/stores_good');

const options = {
  id: 1,
  userLocation: { lat: -6.260740, lng: 106.782024 },
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

  it('Should return correct total from stores', (done) => {
    const matrix = new Matrix(options);

    const store = new Store(storeOptions);
    const storesGood1 = new StoresGood(storesGoodOptions1);
    const storesGood2 = new StoresGood(storesGoodOptions2);
    store.addStoresGood(storesGood1);
    store.addStoresGood(storesGood2);
    matrix.addStore(store);

    const store2 = new Store({
      id: 2,
      name: 'Store 2',
      location: {
        lat: -6.15074,
        lng: 106.572024,
      },
      _storesGoods: [],
    });
    const storesGood3 = new StoresGood({
      id: 3,
      good: {
        id: 3,
        name: 'Good 3',
      },
      price: 3000,
      quantity: 5,
    });
    const storesGood4 = new StoresGood({
      id: 4,
      good: {
        id: 4,
        name: 'Good 4',
      },
      price: 4000,
      quantity: 5,
    });
    store2.addStoresGood(storesGood3);
    store2.addStoresGood(storesGood4);
    matrix.addStore(store2);

    const total = matrix.getTotalFromStores();
    expect(total).to.eql(70000);
    done();
  });

  it('Should return correct distance price total', (done) => {
    const matrix = new Matrix(options);

    const store = new Store(storeOptions);
    const storesGood1 = new StoresGood(storesGoodOptions1);
    const storesGood2 = new StoresGood(storesGoodOptions2);
    store.addStoresGood(storesGood1);
    store.addStoresGood(storesGood2);
    matrix.addStore(store);

    const store2 = new Store({
      id: 2,
      name: 'Store 2',
      location: {
        lat: -6.15074,
        lng: 106.572024,
      },
      _storesGoods: [],
    });
    const storesGood3 = new StoresGood({
      id: 3,
      good: {
        id: 3,
        name: 'Good 3',
      },
      price: 3000,
      quantity: 5,
    });
    store2.addStoresGood(storesGood3);
    matrix.addStore(store2);

    // 24.755 km + 1.568 km
    const total = matrix.getDistancePriceTotalFromStores();
    expect(total).to.eql(263152.68);
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

    const store2 = new Store({
      id: 2,
      name: 'Store 2',
      location: {
        lat: -6.15074,
        lng: 106.572024,
      },
      _storesGoods: [],
    });
    const storesGood3 = new StoresGood({
      id: 3,
      good: {
        id: 3,
        name: 'Good 3',
      },
      price: 3000,
      quantity: 5,
    });
    store2.addStoresGood(storesGood3);
    matrix.addStore(store2);

    // 24.755 km + 1.568 km
    const total = matrix.getTotal();
    expect(total).to.eql(263152.68 + 50000);
    done();
  });

  it('Should optimize stores', (done) => {
    const matrix = new Matrix(options);

    const store = new Store(storeOptions);
    const storesGood1 = new StoresGood(storesGoodOptions1);
    const storesGood2 = new StoresGood(storesGoodOptions2);
    store.addStoresGood(storesGood1);
    store.addStoresGood(storesGood2);
    matrix.addStore(store);

    const store2 = new Store({
      id: 2,
      name: 'Store 2',
      location: {
        lat: -6.15074,
        lng: 106.572024,
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

    matrix.optimizeStores();

    // 24.755 km + 1.568 km
    expect(matrix.stores).to.have.lengthOf(1);
    done();
  });
});
