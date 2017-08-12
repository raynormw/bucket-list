const expect = require('chai').expect;
const _ = require('lodash');

const Store = require('../algorithm/store');
const StoresGood = require('../algorithm/stores_good');

const options = {
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

describe('Test store', () => {
  it('Should store correct properties', (done) => {

    const store = new Store(options);
    expect(store).to.eql(options);
    done();
  });

  it('Should return correct distance', (done) => {
    const store = new Store(options);
    const store2 = new Store(options);

    const storeDistance = store.getDistanceFrom(store2);
    expect(storeDistance).to.eql(0);
    done();
  });

  it('Should return 1 stores good', (done) => {
    const store = new Store(options);
    const storesGood = new StoresGood(storesGoodOptions);
    store.addStoresGood(storesGood)
    expect(store.storesGoods).to.have.lengthOf(1);
    done();
  });
});
