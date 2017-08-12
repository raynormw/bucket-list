const expect = require('chai').expect;
const _ = require('lodash');

const StoresGood = require('../algorithm/stores_good');

const options = {
  id: 1,
  good: {
    id: 1,
    name: 'A Good',
  },
  price: 1000,
  quantity: 10,
  _selected: true,
};

describe('Test stores good', () => {
  it('Should store correct properties', (done) => {

    const storesGood = new StoresGood(options);
    expect(storesGood).to.eql(options);
    done();
  });

  it('Should return correct total', (done) => {
    const storesGood = new StoresGood(options);
    const total = storesGood.getTotal();
    expect(total).to.eql(10000);
    done();
  });
});
