const _ = require('lodash');
const G = require('generatorics');

class PricingAlgorithm {
  constructor(storesGoods, items) {
    this._storesGoods = storesGoods;
    this._items = items;

    const stores = [];
    for (let i = 0; i < this._storesGoods.length; i += 1) {
      const store = this._storesGoods[i].Store;
      stores.push(store);
    }

    this._stores = stores;
    this._storesAsObject = this.fillStoresAsObject(stores);
  }

  fillStoresAsObject(stores) {
    const storesAsObject = {};
    for (let i = 0; i < stores.length; i += 1) {
      const store = stores[i];
      const items = _.filter(this._storesGoods, (storesGood) => {
        return store.id === storesGood.Store.id;
      });
      storesAsObject[store.id] = {
        id: store.id,
        name: store.name,
        items,
      };
    }

    return storesAsObject;
  }

  getStoresGoods() {
    return this._storesGoods;
  }

  getPermutations() {
    const result = [];
    const storeIds = this.getStoreIds();
    for (const perm of G.permutation(storeIds)) {
      result.push(Array.from(perm));
    }
    return result;
  }

  getPermutationMatrix() {
    const result = [];
    const permutations = this.getPermutations();
    console.log(this._storesAsObject);
    for (let i = 0; i < permutations.length; i += 1) {
      const permutation = permutations[i];
      const innerMatrix = [];
      for (let j = 0; j < permutation.length; j += 1) {
        innerMatrix.push(_.cloneDeep(this._storesAsObject[permutation[j]]));
      }
      result.push(innerMatrix);
    }
    return result;
  }

  getStoreIds() {
    const result = [];
    for (let i = 0; i < this._stores.length; i += 1) {
      const store = this._stores[i];
      result.push(`${store.id}`);
    }
    return result;
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
