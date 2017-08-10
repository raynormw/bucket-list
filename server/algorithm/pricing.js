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

      const minimumPrice = minimumPriceStoresGood.price;

      const minimumPriceStoresGoods = _.filter(matchStoresGoods, (storesGood) => {
        return storesGood.price === minimumPrice;
      });

      result.push(...minimumPriceStoresGoods);
    }
    return result;
  }

  getOptmizedModels() {
    const result = [];
    const stores = {};

    const minimumPrices = this.getStoresGoodsWithMinimumPrice();
    const storesIdsInMinimumPrices = minimumPrices.map((minimumPrice) => {
      return minimumPrice.Store.id;
    });

    for (let i = 0; i < this._storesGoods.length; i += 1) {
      const storesGood = this._storesGoods[i];
      const item = _.find(this._items, (_item) => {
        return storesGood.Good.id === _item.goodId;
      });
      const store = stores[storesGood.Store.id];

      const storesGoodId = storesGood.id;
      const foundInMinimum = _.filter(minimumPrices, (minimumPrice) => {
        return minimumPrice.id === storesGoodId;
      });

      let isMinimumPrice = false;
      if (foundInMinimum.length > 0) {
        isMinimumPrice = true;
      }

      if (store) {
        store.storesGoods.push({
          id: storesGood.Good.id,
          name: storesGood.Good.name,
          price: storesGood.price,
          quantity: item.quantity,
          total: item.quantity * storesGood.price,
          isMinimumPrice,
        });
      } else {
        stores[storesGood.Store.id] = {
          storeId: storesGood.Store.id,
          storeName: storesGood.Store.name,
          visible: _.includes(storesIdsInMinimumPrices, storesGood.Store.id),
          storesGoods: [{
            id: storesGood.Good.id,
            name: storesGood.Good.name,
            price: storesGood.price,
            quantity: item.quantity,
            total: item.quantity * storesGood.price,
            isMinimumPrice,
          }],
        };
      }
    }

    const storeKeys = _.keys(stores);
    for (let i = 0; i < storeKeys.length; i += 1) {
      result.push(stores[storeKeys[i]]);
    }

    return result;
  }

}

module.exports = PricingAlgorithm;
