const expect = require('chai').expect;

const StoresGood = require('../algorithm/stores_good');

const options = {
  id: 1,
  good: {
    id: 1,
    name: 'A Good',
  },
  price: 2500,
  quantity: 3,
};

describe('Test stores good', () => {
  it('Should store correct properties', (done) => {

    const storesGood = new StoresGood(options);
    expect(storesGood).to.eql({
      id: 1,
      good: {
        id: 1,
        name: 'A Good',
      },
      price: 2500,
      quantity: 3,
      _selected: true,
    });
    done();
  });

  it('Should return correct total', (done) => {
    const storesGood = new StoresGood(options);
    const total = storesGood.getTotal();
    expect(total).to.eql(7500);
    done();
  });

  it('Should return selected false', (done) => {
    const storesGood = new StoresGood(options);
    storesGood.selected = false;
    expect(storesGood.selected).to.be.false;
    done();
  });
});
