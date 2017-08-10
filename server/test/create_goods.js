const models = require('../models');

const createGoods = () => {
  const goods = [
    {
      id: 1,
      name: 'Good 1',
    },
    {
      id: 2,
      name: 'Good 2',
    },
    {
      id: 3,
      name: 'Good 3',
    },
    {
      id: 4,
      name: 'Good 4',
    },
  ];

  const promises = [];
  for (let i = 0; i < goods.length; i += 1) {
    const good = goods[i];
    const promise = new Promise((resolve, reject) => {
      models.Good.create({
        id: good.id,
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
