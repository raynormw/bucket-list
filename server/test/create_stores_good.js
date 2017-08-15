const models = require('../models');

const createStoresGood = (store, good, price) => {
  return new Promise((resolve, reject) => {
    models.Stores_Good.create({
      price,
    })
    .then((createdStoresGood) => {
      createdStoresGood.setStore(store)
      .then(() => {
        createdStoresGood.setGood(good)
        .then(() => {
          resolve(createdStoresGood);
        });
      });
    })
    .catch((err) => {
      reject(err);
    });
  });
};

module.exports = createStoresGood;
