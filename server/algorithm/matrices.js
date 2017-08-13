const distance = require('geo-coords-distance');
const _ = require('lodash');

const round = (value, decimals) => {
  return Number(Math.round(`${value}e${decimals}`) + `e-${decimals}`);
};

class Matrices {
  constructor() {
    this._matrices = [];
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
}

module.exports = Matrices;
