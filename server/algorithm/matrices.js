const distance = require('geo-coords-distance');
const _ = require('lodash');

const round = (value, decimals) => {
  return Number(Math.round(`${value}e${decimals}`) + `e-${decimals}`);
};

class Matrices {
  constructor(options) {
    this._matrices = [];
    this._userLocation = options.userLocation;
  }

  addMatrix(matrix) {
    this._matrices.push(matrix);
  }

  optimizeMatrices() {
    for (let i = 0; i < this._matrices.length; i += 1) {
      const matrix = this._matrices[i];
      matrix.optimizeStores();
    }
  }

  getResult() {
    const optimizedMatrices = [];

    for (let i = 0; i < this._matrices.length; i += 1) {
      const matrix = this._matrices[i];
      const stores = matrix.stores;
      const storesResult = [];
      let storesOptimizedTotal = 0;
      let storesOptimizedTotalWithDistance = 0;

      for (let j = 0; j < stores.length; j += 1) {
        const store = stores[j];
        let targetStore = null;
        if (j === 0) {
          targetStore = { location: this._userLocation };
        } else {
          targetStore = stores[j - 1];
        }

        const optimizedTotal = store.getTotalOfSelectedStoresGoods();
        const distancePrice = store.getDistancePriceFrom(targetStore);

        storesOptimizedTotal += optimizedTotal;
        storesOptimizedTotalWithDistance += (optimizedTotal + distancePrice);
        storesResult.push({
          id: store.id,
          name: store.name,
          location: store.location,
          total: store.getTotal(),
          optimizedTotal,
          distance: store.getDistanceFrom(targetStore),
          distancePrice,
          items: store.storesGoods,
        });
      }
      optimizedMatrices.push({
        matrixId: matrix.id,
        stores: storesResult,
        storesOptimizedTotal,
        storesOptimizedTotalWithDistance,
      });
    }

    const singleMinimumMatrix = _.minBy(optimizedMatrices, (o) => {
      return o.storesOptimizedTotalWithDistance;
    });

    const mostOptimizedMatrices = _.filter(optimizedMatrices, (o) => {
      return o.storesOptimizedTotalWithDistance === singleMinimumMatrix.storesOptimizedTotalWithDistance;
    });


    const result = {
      matricesCount: this._matrices.length,
      optimizedMatrices,
      mostOptimizedMatrices,
      mostOptimizedMatrix: singleMinimumMatrix,
    };

    return result;
  }
}

module.exports = Matrices;
