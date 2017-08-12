const distance = require('geo-coords-distance');

const round = (value, decimals) => {
  return Number(Math.round(`${value}e${decimals}`) + `e-${decimals}`);
};

class Store {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.location = options.location;
    this._storesGoods = [];
  }

  getDistanceFrom(store) {
    return round(distance.default(this.location, store.location), 2);
  }

  addStoresGood(storesGood) {
    this._storesGoods.push(storesGood);
  }

  get storesGoods() {
    return this._storesGoods;
  }
}

module.exports = Store;
