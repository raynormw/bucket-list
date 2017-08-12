const _ = require('lodash');
const G = require('generatorics');
const distance = require('geo-coords-distance');

const DISTANCE_PRICE = 1;

class PricingAlgorithm {
  constructor(storesGoods, items, initLocation) {
    this._storesGoods = storesGoods;
    this._items = items;
    this._initLocation = initLocation;

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
          total: item.quantity * storesGood.price,
          isMinimumPrice: true,
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

  getPermutations() {
    const result = [];
    const storeIds = this.getStoreIds();
    console.log('------> storeIds: ', storeIds);
    for (const perm of G.permutation(storeIds)) {
      result.push(Array.from(perm));
    }
    return result;
  }

  getPermutationMatrix() {
    const result = [];
    const permutations = this.getPermutations();
    for (let i = 0; i < permutations.length; i += 1) {
      const permutation = permutations[i];
      const innerMatrix = [];
      for (let j = 0; j < permutation.length; j += 1) {
        const clonedObject = _.cloneDeep(this._storesAsObject[permutation[j]]);
        if (j === 0) {
          const firstPoint = { lat: this._initLocation.lat, lng: this._initLocation.lng };
          const secondPoint = { lat: clonedObject.lat_long[0], lng: clonedObject.lat_long[1] };
          const storeDistance = distance.default(firstPoint, secondPoint);
          clonedObject.storeDistance = storeDistance;
        } else {
          const firstPoint = { lat: innerMatrix[j - 1].lat_long[0], lng: innerMatrix[j - 1].lat_long[1] };
          const secondPoint = { lat: clonedObject.lat_long[0], lng: clonedObject.lat_long[1] };
          const storeDistance = distance.default(firstPoint, secondPoint);
          clonedObject.storeDistance = storeDistance;
        }
        innerMatrix.push(clonedObject);
      }
      result.push(innerMatrix);
    }
    return result;
  }

  getOptimizedMatrix() {
    const countMatrixTotal = (stores) => {
      const result = {
        total: 0,
        subTotal: 0,
        distanceTotal: 0,
      };
      for (let i = 0; i < stores.length; i += 1) {
        const store = stores[i];
        result.distanceTotal += (DISTANCE_PRICE * store.storeDistance);
        result.total += (DISTANCE_PRICE * store.storeDistance);
        for (let j = 0; j < store.storesGoods.length; j += 1) {
          const storesGood = store.storesGoods[j];
          if (storesGood.isMinimumPrice) {
            result.total += storesGood.total;
            result.subTotal += storesGood.total;
          }
        }
      }
      return result;
    };

    const result = [];
    const permutationMatrixOriginal = this.getPermutationMatrix();
    const permutationMatrixs = _.cloneDeep(permutationMatrixOriginal);
    for (let i = 0; i < permutationMatrixs.length; i += 1) {
      const matrix = permutationMatrixs[i];
      const innerResult = {
        matrixNo: i,
        matrixTotal: 0,
        matrixSubTotal: 0,
        stores: [],
      };
      for (let j = 0; j < matrix.length; j += 1) {
        const store = matrix[j];
        innerResult.stores.push(store);
        if (j === (matrix.length - 1)) {
          const theTotal = countMatrixTotal(innerResult.stores);
          innerResult.matrixTotal = theTotal.total;
          innerResult.matrixSubTotal = theTotal.subTotal;
          innerResult.matrixDistanceTotal = theTotal.distanceTotal;
          result.push(innerResult);
          break;
        }
        const storesGoods = store.storesGoods;
        const storeGoodsGoodIds = storesGoods.map((storesGood) => {
          return storesGood.goodId;
        });

        let nextStore = matrix[j + 1];
        const nextStoresGoods = nextStore.storesGoods;
        const nextStoreGoodsGoodIds = nextStoresGoods.map((storesGood) => {
          return storesGood.goodId;
        });

        const storesGoodsTotal1 = storesGoods.map((storesGood) => {
          return storesGood.total;
        });
        const total1 = storesGoodsTotal1.reduce((sum, value) => {
          return sum + value;
        });

        const intersectionIds = _.intersection(storeGoodsGoodIds, nextStoreGoodsGoodIds);
        if (intersectionIds.length < nextStoreGoodsGoodIds.length) {
          for (let x = 0; x < intersectionIds.length; x += 1) {
            const intersectionId = intersectionIds[x];
            const storesGood1 = _.find(storesGoods, (storesGood) => {
              return storesGood.goodId === intersectionId;
            });
            const storesGood2 = _.find(nextStoresGoods, (storesGood) => {
              return storesGood.goodId === intersectionId;
            });

            if (storesGood1.price < storesGood1.price) {
              storesGood1.isMinimumPrice = true;
              storesGood2.isMinimumPrice = false;
            } else if (storesGood1.price > storesGood1.price) {
              storesGood1.isMinimumPrice = false;
              storesGood2.isMinimumPrice = true;
            } else {
              //must pick one
              storesGood1.isMinimumPrice = false;
              storesGood2.isMinimumPrice = true;
            }
          }
        } else {
          const storesGoodsTotal2 = nextStoresGoods.map((storesGood) => {
            return storesGood.total;
          });
          const total2 = storesGoodsTotal2.reduce((sum, value) => {
            return sum + value;
          }) + (DISTANCE_PRICE * nextStore.storeDistance);

          if (total1 <= total2) {
            matrix.splice((j + 1), 1);

            if (matrix.length < j + 1) {
              nextStore = matrix[j + 1];
              const firstPoint = { lat: store.lat_long[0], lng: store.lat_long[1] };
              const secondPoint = { lat: nextStore.lat_long[0], lng: nextStore.lat_long[1] };
              const storeDistance = distance.default(firstPoint, secondPoint);
              nextStore.storeDistance = storeDistance;
            }

            j = -1;
            innerResult.stores = [];
          } else {
            for (let x = 0; x < intersectionIds.length; x += 1) {
              const intersectionId = intersectionIds[x];
              const storesGood1 = _.find(storesGoods, (storesGood) => {
                return storesGood.goodId === intersectionId;
              });
              const storesGood2 = _.find(nextStoresGoods, (storesGood) => {
                return storesGood.goodId === intersectionId;
              });

              if (storesGood1.price < storesGood1.price) {
                storesGood1.isMinimumPrice = true;
                storesGood2.isMinimumPrice = false;
              } else if (storesGood1.price > storesGood1.price) {
                storesGood1.isMinimumPrice = false;
                storesGood2.isMinimumPrice = true;
              }
            }
          }
        }
      }
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
