const _ = require('lodash');
const G = require('generatorics');

const Store = require('./store');
const Matrix = require('./matrix');
const StoresGood = require('./stores_good');
const Matrices = require('./matrices');

class PricingAlgorithm {
  constructor(storesGoods, items, userLocation) {
    this._storesGoods = storesGoods;
    this._items = items;
    this._userLocation = userLocation;

    const stores = [];
    for (let i = 0; i < this._storesGoods.length; i += 1) {
      const store = this._storesGoods[i].Store;
      const foundStore = _.find(stores, (theStore) => {
        return theStore.id === store.id;
      });

      if (!foundStore) {
        stores.push(store);
      }
    }

    this._stores = stores;
    this._storesAsObject = this.fillStoresAsObject(stores);
  }

  fillStoresAsObject(stores) {
    const storesAsObject = {};
    for (let i = 0; i < stores.length; i += 1) {
      const store = stores[i];
      const storesGoods = _.filter(this._storesGoods, (storesGood) => {
        return store.id === storesGood.Store.id;
      });

      const mappedStoresGoods = storesGoods.map((storesGood) => {
        const item = _.find(this._items, (_item) => {
          return storesGood.Good.id === _item.goodId;
        });
        return {
          id: storesGood.id,
          goodId: storesGood.Good.id,
          goodName: storesGood.Good.name,
          price: storesGood.price,
          quantity: item.quantity,
        };
      });

      storesAsObject[store.id] = {
        id: store.id,
        name: store.name,
        lat_long: store.lat_long,
        storesGoods: mappedStoresGoods,
      };
    }

    return storesAsObject;
  }

  getStoresGoods() {
    return this._storesGoods;
  }

  getStoreIds() {
    const result = [];
    for (let i = 0; i < this._stores.length; i += 1) {
      const store = this._stores[i];
      result.push(`${store.id}`);
    }
    return result;
  }

  getPermutations() {
    const result = [];
    const storeIds = this.getStoreIds();
    for (const perm of G.permutation(storeIds)) {
      result.push(Array.from(perm));
    }
    return result;
  }

  getPermutationMatrices() {
    const matrices = new Matrices({
      userLocation: this._userLocation,
    });
    const permutations = this.getPermutations();
    for (let i = 0; i < permutations.length; i += 1) {
      const permutation = permutations[i];
      const matrix = new Matrix({
        id: i,
      });
      for (let j = 0; j < permutation.length; j += 1) {
        const storeAsObject = this._storesAsObject[permutation[j]];
        const storeOptions = {
          id: storeAsObject.id,
          name: storeAsObject.name,
          location: {
            lat: storeAsObject.lat_long[0],
            lng: storeAsObject.lat_long[1],
          },
          _storesGoods: [],
        };

        const store = new Store(storeOptions);
        const storeAsObjectItems = storeAsObject.storesGoods;
        for (let k = 0; k < storeAsObjectItems.length; k += 1) {
          const storeAsObjectItem = storeAsObjectItems[k];
          const storesGoodOptions = {
            id: storeAsObjectItem.id,
            good: {
              id: storeAsObjectItem.goodId,
              name: storeAsObjectItem.goodName,
            },
            price: storeAsObjectItem.price,
            quantity: storeAsObjectItem.quantity,
          };

          const storesGood = new StoresGood(storesGoodOptions);
          store.addStoresGood(storesGood);
        }
        matrix.addStore(store);
      }
      matrices.addMatrix(matrix);
    }
    return matrices;
  }

  getOptimizedMatrices() {
    const matrices = this.getPermutationMatrices();
    matrices.optimizeMatrices();
    return matrices.getResult();
  }

}

module.exports = PricingAlgorithm;
