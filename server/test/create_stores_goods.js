const createStores = require('./create_stores');
const createGoods = require('./create_goods');
const createStoresGood = require('./create_stores_good');

const createStoresGoods = () => {

  return new Promise((resolve, reject) => {
    Promise.all(createStores())
    .then((stores) => {
      console.log('-----------------> stores.length :', stores.length);
      Promise.all(createGoods())
      .then((goods) => {
        console.log('-----------------> goods.length :', goods.length);
        const promises = [];
        const promise = new Promise((resolve2, reject2) => {
          createStoresGood(stores[0], goods[0], 5000)
          .then((createdStoresGood) => {
            resolve2(createdStoresGood);
          })
          .catch((err) => {
            reject2(err);
          });
        });

        promises.push(promise);
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
