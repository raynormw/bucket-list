const models = require('../models');

const createGoods = () => {
  const goods = [
    {
      name: 'Good 1',
    },
    {
      name: 'Good 2',
    },
    {
      name: 'Good 3',
    },
    {
      name: 'Good 4',
    },
  ];

  const promises = [];
  for (let i = 0; i < goods.length; i += 1) {
    const good = goods[i];
    const promise = new Promise((resolve, reject) => {
      models.Good.create({
        name: good.name,
      })
      .then((createdGood) => {
        resolve(createdGood);
      })
      .catch((err) => {
        reject(err);
      });
    });
    promises.push(promise);
  }

  return promises;
};

module.exports = createGoods;
