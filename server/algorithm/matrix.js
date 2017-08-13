const _ = require('lodash');

class Matrix {
  constructor(options) {
    this.id = options.id;
    this._stores = [];
    this._userLocation = options.userLocation;
  }

  get stores() {
    return this._stores;
  }

  addStore(store) {
    this._stores.push(store);
  }

  getTotal() {
    const totalFromStores = this.getTotalFromStores();
    const distancePriceTotal = this.getDistancePriceTotalFromStores();

    return totalFromStores + distancePriceTotal;
  }

  getTotalFromStores() {
    let result = 0;
    for (let i = 0; i < this._stores.length; i += 1) {
      const store = this._stores[i];
      result += store.getTotalOfSelectedStoresGoods();
    }
    return result;
  }

  getDistancePriceTotalFromStores() {
    let result = 0;
    for (let i = 0; i < this._stores.length; i += 1) {
      const store = this._stores[i];
      let targetStore = null;
      if (i === 0) {
        targetStore = { location: this._userLocation };
      } else {
        targetStore = this._store[i - 1];
      }
      result += store.getDistancePriceFrom(targetStore);
    }
    return result;
  }

  optimizeStores() {
    let optimized = false;
    let i = 0;

    if (this._stores.length <= 1) {
      optimized = true;
    }

    // Guard to prevent infinite loop
    let guard = 0;

    while (!optimized && guard < 3000) {
      guard += 1;

      const store1Index = i;
      const store2Index = i + 1;
      const store1 = this._stores[store1Index];
      const store2 = this._stores[store2Index];

      const store1GoodIds = store1.getGoodIds();
      const store2GoodIds = store2.getGoodIds();

      const intersectionIds = _.intersection(store1GoodIds, store2GoodIds);

      // Indicates store2 has items not in store1
      if (intersectionIds.length < store2GoodIds.length) {
        for (let j = 0; j < intersectionIds.length; j += 1) {
          const intersectionId = intersectionIds[j];
          const storesGood1 = store1.getStoresGoodByGoodId(intersectionId);
          const storesGood2 = store2.getStoresGoodByGoodId(intersectionId);

          if (storesGood1.price < storesGood2.price) {
            storesGood1.selected = true;
            storesGood2.selected = false;
          } else if (storesGood1.price > storesGood2.price) {
            storesGood1.selected = false;
            storesGood2.selected = true;
          } else {
            // must pick one
            storesGood1.selected = false;
            storesGood2.selected = true;
          }
        }

        if ((store2Index) === this._stores.length - 1) {
          optimized = true;
        } else {
          i += 1;
        }
      } else {
        const intersectionTotal1 = store1.getTotalByGivenGoodIds(intersectionIds);
        const intersectionTotal2 = store2.getTotal() + store2.getDistancePriceFrom(store1);

        // All items in store1 are cheaper then store2
        if (intersectionTotal1 <= intersectionTotal2) {
          this._stores.splice(store2Index, 1);
          if (this._stores.length === 1) {
            optimized = true;
          }
        } else {
          for (let j = 0; j < intersectionIds.length; j += 1) {
            const intersectionId = intersectionIds[j];
            const storesGood1 = store1.getStoresGoodByGoodId(intersectionId);
            const storesGood2 = store2.getStoresGoodByGoodId(intersectionId);

            if (storesGood1.price < storesGood2.price) {
              storesGood1.selected = true;
              storesGood2.selected = false;
            } else if (storesGood1.price > storesGood2.price) {
              storesGood1.selected = false;
              storesGood2.selected = true;
            } else {
              // must pick one
              storesGood1.selected = false;
              storesGood2.selected = true;
            }
          }

          if ((store2Index) === this._stores.length - 1) {
            optimized = true;
          } else {
            i += 1;
          }
        }
      }
    }
  }
}

module.exports = Matrix;
