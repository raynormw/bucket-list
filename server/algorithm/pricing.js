const _ = require('lodash');

class PricingAlgorithm {
  constructor(storesGoods, items) {
    this._storesGoods = storesGoods;
    this._items = items;
  }

  getStoresGoods() {
    return this._storesGoods;
  }

  getStoresGoodsWithMinimumPrice() {
    const result = [];
    for (let i = 0; i < this._items.length; i += 1) {
      const item = this._items[i];
      const matchStoresGoods = _.filter(this._storesGoods, (storesGood) => {
        return storesGood.Good.id === item.goodId;
      });

      const minimumPriceStoresGood = _.minBy(matchStoresGoods, (matchStoresGood) => {
        return matchStoresGood.price;
      });

      if (minimumPriceStoresGood) {
        result.push(minimumPriceStoresGood);
      }
    }
    return result;
  }

  getOptmizedModels() {
    const result = [];
    const stores = {};

    const minimumPrices = this.getStoresGoodsWithMinimumPrice();
    console.log('------------------> ', minimumPrices.length);

    for (let i = 0; i < this._storesGoods.length; i += 1) {
      const storesGood = this._storesGoods[i];
      const store = stores[storesGood.Store.id];

      const storesGoodId = storesGood.id;
      const foundInMinimum = _.filter(minimumPrices, (minimumPrice) => {
        return minimumPrice.id === storesGoodId;
      });

      let isMinimumPrice = false;
      if (foundInMinimum) {
        isMinimumPrice = true;
      }

      if (store) {

      } else {
        stores[storesGood.Store.id] = {
          storeId: storesGood.Store.id,
          storeName: storesGood.Store.name,
          storesGoods: [{
            id: storesGood.Good.id,
            name: storesGood.Good.name,
            price: storesGood.price,
            isMinimumPrice,
          }],
        };
      }
    }

    return stores;
  }

}

module.exports = PricingAlgorithm;
