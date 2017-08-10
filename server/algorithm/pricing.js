class PricingAlgorithm {
  constructor(storesGoods, items) {
    this._storesGoods = storesGoods;
    this._items = items;
  }

  getStoresGoods() {
    return this._storesGoods;
  }
}

module.exports = PricingAlgorithm;
