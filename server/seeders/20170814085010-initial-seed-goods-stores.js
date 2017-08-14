'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Stores_Goods', [{
      store_id: 1,
      good_id: 3,
      price: 16200,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 1,
      good_id: 6,
      price: 36000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 1,
      good_id: 11,
      price: 50000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 1,
      good_id: 12,
      price: 9000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 1,
      good_id: 17,
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 2,
      good_id: 1,
      price: 110000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 2,
      good_id: 7,
      price: 190000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 2,
      good_id: 10,
      price: 220000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 3,
      good_id: 14,
      price: 31200,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 3,
      good_id: 18,
      price: 2500,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 3,
      good_id: 6,
      price: 16250,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 4,
      good_id: 10,
      price: 210000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 4,
      good_id: 7,
      price: 375000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 4,
      good_id: 1,
      price: 120000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 5,
      good_id: 5,
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 5,
      good_id: 13,
      price: 200000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 5,
      good_id: 14,
      price: 24850,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 6,
      good_id: 4,
      price: 6000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 6,
      good_id: 14,
      price: 22350,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 6,
      good_id: 15,
      price: 38525,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 7,
      good_id: 6,
      price: 14725,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 7,
      good_id: 3,
      price: 15650,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 7,
      good_id: 10,
      price: 215275,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 8,
      good_id: 13,
      price: 185750,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 8,
      good_id: 7,
      price: 375750,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 8,
      good_id: 1,
      price: 99800,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 9,
      good_id: 3,
      price: 12750,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 9,
      good_id: 6,
      price: 35500,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 9,
      good_id: 11,
      price: 48500,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 10,
      good_id: 10,
      price: 202500,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 10,
      good_id: 13,
      price: 189500,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      store_id: 10,
      good_id: 1,
      price: 10500,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {})
    */
  }
}
