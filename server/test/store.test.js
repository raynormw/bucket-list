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
};

const storesGoodOptions = {
  id: 1,
  good: {
    id: 1,
    name: 'A Good',
  },
  price: 1000,
  quantity: 10,
};

describe('Test store', () => {
  it('Should store correct properties', (done) => {

    const store = new Store(options);
    expect(store).to.eql({
      id: 1,
      name: 'A Store',
      location: {
        lat: -6.16074,
        lng: 106.582024,
      },
      _storesGoods: [],
    });
    done();
  });

  it('Should return correct distance', (done) => {
    const store = new Store(options);
    const store2 = new Store(options);

    const storeDistance = store.getDistanceFrom(store2);
    expect(storeDistance).to.eql(0);
    done();
  });

  it('Should return correct distance', (done) => {
    const store = new Store(options);
    const store2 = new Store({
      id: 2,
      name: 'Store 2',
      location: {
        lat: -6.15074,
        lng: 106.582024,
      },
    });

    const storeDistance = store.getDistanceFrom(store2);
    expect(storeDistance).to.eql(1111.949);
    done();
  });

  it('Should return correct distance price', (done) => {
    const store = new Store(options);
    const store2 = new Store({
      id: 2,
      name: 'Store 2',
      location: {
        lat: -6.15074,
        lng: 106.582024,
      },
    });

    const storeDistance = store.getDistancePriceFrom(store2);
    expect(storeDistance).to.eql(11119.49);
    done();
  });

  it('Should return 1 stores good', (done) => {
    const store = new Store(options);
    const storesGood = new StoresGood(storesGoodOptions);
    store.addStoresGood(storesGood);
    expect(store.storesGoods).to.have.lengthOf(1);
    done();
  });

  it('Should return 2 good ids', (done) => {
    const store = new Store(options);
    const storesGood = new StoresGood(storesGoodOptions);
    store.addStoresGood(storesGood);

    const storesGood2 = new StoresGood({
      id: 2,
      good: {
        id: 3,
        name: 'Good 2',
      },
      price: 1500,
      quantity: 11,
    });
    store.addStoresGood(storesGood2);

    expect(store.getGoodIds()).to.have.lengthOf(2);
    expect(store.getGoodIds()).to.eql([1, 3]);
    done();
  });

  it('Should return 2 selected good ids', (done) => {
    const store = new Store(options);
    const storesGood = new StoresGood(storesGoodOptions);
    store.addStoresGood(storesGood);

    const storesGood2 = new StoresGood({
      id: 2,
      good: {
        id: 3,
        name: 'Good 2',
      },
      price: 1500,
      quantity: 11,
    });
    store.addStoresGood(storesGood2);

    expect(store.getSelectedGoodIds()).to.have.lengthOf(2);
    expect(store.getSelectedGoodIds()).to.eql([1, 3]);
    done();
  });

  it('Should return 1 selected good id', (done) => {
    const store = new Store(options);
    const storesGood = new StoresGood(storesGoodOptions);
    store.addStoresGood(storesGood);

    const storesGood2 = new StoresGood({
      id: 2,
      good: {
        id: 3,
        name: 'Good 2',
      },
      price: 1500,
      quantity: 11,
    });
    store.addStoresGood(storesGood2);

    storesGood2.selected = false;

    expect(store.getSelectedGoodIds()).to.have.lengthOf(1);
    expect(store.getSelectedGoodIds()).to.eql([1]);
    done();
  });

  it('Should return no selected good id', (done) => {
    const store = new Store(options);

    expect(store.getSelectedGoodIds()).to.have.lengthOf(0);
    expect(store.getSelectedGoodIds()).to.eql([]);
    done();
  });

  it('Should return 1 stores good', (done) => {
    const store = new Store(options);
    const storesGood = new StoresGood(storesGoodOptions);
    store.addStoresGood(storesGood);

    const storesGood2 = new StoresGood({
      id: 2,
      good: {
        id: 3,
        name: 'Good 2',
      },
      price: 1500,
      quantity: 11,
    });
    store.addStoresGood(storesGood2);

    expect(store.getStoresGoodByGoodId(3)).to.eql(storesGood2);
    done();
  });

  it('Should return no stores good', (done) => {
    const store = new Store(options);
    expect(store.getStoresGoodByGoodId(1)).to.be.undefined;
    done();
  });
});
