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

  getTotal() {
    let result = 0;
    for (let i = 0; i < this._storesGoods.length; i += 1) {
      const storesGood = this._storesGoods[i];
      result += storesGood.getTotal();
    }
    return result;
  }

  getTotalOfSelectedStoresGoods() {
    let result = 0;
    for (let i = 0; i < this._storesGoods.length; i += 1) {
      const storesGood = this._storesGoods[i];
      if (storesGood.selected) {
        result += storesGood.getTotal();
      }
    }
    return result;
  }
}

module.exports = Store;
