const createStores = require('./create_stores');
const createGoods = require('./create_goods');
const createStoresGood = require('./create_stores_good');

const createStoresGoods = () => {

  return new Promise((resolve, reject) => {
    Promise.all(createStores())
    .then((stores) => {
      Promise.all(createGoods())
      .then((goods) => {

        const storesGoods = [
          {
            store: stores[0],
            good: goods[0],
            price: 5000,
          },
          {
            store: stores[1],
            good: goods[0],
            price: 5000,
          },
          {
            store: stores[1],
            good: goods[1],
            price: 4000,
          },
        ];

        const promises = [];
        for (let i = 0; i < storesGoods.length; i += 1) {
          const promise = new Promise((resolve2, reject2) => {
            const storesGood = storesGoods[i];
            createStoresGood(storesGood.store, storesGood.good, storesGood.price)
            .then((createdStoresGood) => {
              resolve2(createdStoresGood);
            })
            .catch((err) => {
              reject2(err);
            });
          });

          promises.push(promise);
        }
        Promise.all(promises)
        .then((storesGoods) => {
          resolve(storesGoods);
        });
      });
    })
    .catch((err) => {
      reject(err);
    });
  });
};

module.exports = createStoresGoods;
