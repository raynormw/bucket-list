const models = require('../models');

const createStores = () => {
  const stores = [
    {
      name: 'Toko 1',
      lat_long: [-6.260740, 106.782024],
    },
    {
      name: 'Toko 2',
      lat_long: [-6.160740, 106.582024],
    },
  ];

  const promises = [];
  for (let i = 0; i < stores.length; i += 1) {
    const store = stores[i];
    const promise = new Promise((resolve, reject) => {
      models.Store.create({
        name: store.name,
        lat_long: store.lat_long,
      })
      .then((createdStore) => {
        resolve(createdStore);
      })
      .catch((err) => {
        reject(err);
      });
    });
    promises.push(promise);
  }

  return promises;
};

module.exports = createStores;
