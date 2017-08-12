const expect = require('chai').expect;
const _ = require('lodash');

const Element = require('../algorithm/element');

const options = {
  id: 1,
  good: {
    id: 1,
    name: 'A Good',
  },
  price: 1000,
  quantity: 10,
};

describe('Test element', () => {
  it('Should store correct properties', (done) => {

    const element = new Element(options);
    expect(element).to.eql(options);
    done();
  });

  it('Should return correct total', (done) => {
    const element = new Element(options);
    const total = element.getTotal();
    expect(total).to.eql(10000);
    done();
  });
});
