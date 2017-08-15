'use strict'
var hash = require('object-hash')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Admins', [{
      name: 'admin',
      email: 'admin@pricepolice.id',
      password: hash('admin'),
      role: 'admin'
    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admins', [{
      name: 'admin',
      email: 'admin@pricepolice.id',
      password: hash('admin'),
      role: 'admin'
    }], {})
  }
}
