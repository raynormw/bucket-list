const distance = require('haversine');
const _ = require('lodash');
const math = require('mathjs');

const DISTANCE_PRICE = 10;


class Store {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.location = options.location;
    this._storesGoods = [];
  }

  getDistanceFrom(store) {
    return math.round(distance({
      latitude: this.location.lat,
      longitude: this.location.lng,
    }, {
      latitude: store.location.lat,
      longitude: store.location.lng,
    }, { unit: 'meter' }), 3);
  }

  getDistancePriceFrom(store) {
    return math.round((this.getDistanceFrom(store) * DISTANCE_PRICE), 2);
  }

  addStoresGood(storesGood) {
    this._storesGoods.push(storesGood);
  }

  get storesGoods() {
    return this._storesGoods;
  }

  getGoodIds() {
    return this._storesGoods.map(storesGood => storesGood.good.id);
  }

  getSelectedGoodIds() {
    return this._storesGoods
    .filter(storesGood => storesGood.selected)
    .map(storesGood => storesGood.good.id);
  }

  getStoresGoodByGoodId(goodId) {
    return _.find(this._storesGoods, storesGood => storesGood.good.id === goodId);
  }

  getTotal() {
    return this._storesGoods.reduce((sum, value) => sum + value.getTotal(), 0);
  }

  getTotalOfSelectedStoresGoods() {
    return this._storesGoods
    .filter(storesGood => storesGood.selected)
    .reduce((sum, storesGood) => sum + storesGood.getTotal(), 0);
  }

  getTotalByGivenGoodIds(goodIds) {
    return this._storesGoods
    .filter(storesGood => _.includes(goodIds, storesGood.good.id))
    .reduce((sum, storesGood) => sum + storesGood.getTotal(), 0);
  }
}

module.exports = Store;
