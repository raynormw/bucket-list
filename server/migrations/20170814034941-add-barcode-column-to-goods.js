'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
    'Goods',
    'barcode',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Goods', 'barcode')
  }
}
