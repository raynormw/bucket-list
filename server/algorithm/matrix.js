class Matrix {
  constructor(options) {
    this.id = options.id;
    this._stores = [];
  }

  addStore(store) {
    this._stores.push(store);
  }

  getTotal() {
    let result = 0;
    for (let i = 0; i < this._stores.length; i += 1) {
      const store = this._stores[i];
      result += store.getTotalOfSelectedStoresGoods();
    }
    return result;
  }
}

module.exports = Matrix;
