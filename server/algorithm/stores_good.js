class StoresGood {
  constructor(options) {
    this.id = options.id;
    this.good = options.good;
    this.price = options.price;
    this.quantity = options.quantity;
    this._selected = true;
  }

  get selected() {
    return this._selected;
  }

  set selected(value) {
    this._selected = value;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}

module.exports = StoresGood;
