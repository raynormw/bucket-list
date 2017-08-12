class Element {
  constructor(options) {
    this.id = options.id;
    this.good = options.good;
    this.price = options.price;
    this.quantity = options.quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}

module.exports = Element;
