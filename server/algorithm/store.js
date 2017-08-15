const distance = require('geo-coords-distance');
const _ = require('lodash');

const DISTANCE_PRICE = 10;

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

  getDistancePriceFrom(store) {
    return round((this.getDistanceFrom(store) * DISTANCE_PRICE), 2);
  }

  addStoresGood(storesGood) {
    this._storesGoods.push(storesGood);
  }

  get storesGoods() {
    return this._storesGoods;
  }

  getGoodIds() {
    return this._storesGoods.map((storesGood) => {
      return storesGood.good.id;
    });
  }

  getSelectedGoodIds() {
    const result = [];
    for (let i = 0; i < this._storesGoods.length; i += 1) {
      const storesGood = this._storesGoods[i];
      if (storesGood.selected) {
        result.push(storesGood.good.id);
      }
    }
    return result;
  }

  getStoresGoodByGoodId(goodId) {
    return _.find(this._storesGoods, (storesGood) => {
      return storesGood.good.id === goodId;
    });
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

  getTotalByGivenGoodIds(goodIds) {
    let result = 0;
    for (let i = 0; i < this._storesGoods.length; i += 1) {
      const storesGood = this._storesGoods[i];
      if (_.includes(goodIds, storesGood.good.id)) {
        result += storesGood.getTotal();
      }
    }
    return result;
  }

  getTotalOfSelectedStoresGoodsByGivenGoodIds(goodIds) {
    let result = 0;
    for (let i = 0; i < this._storesGoods.length; i += 1) {
      const storesGood = this._storesGoods[i];
      if (_.includes(goodIds, storesGood.good.id) && storesGood.selected) {
        result += storesGood.getTotal();
      }
    }
    return result;
  }
}

module.exports = Store;
