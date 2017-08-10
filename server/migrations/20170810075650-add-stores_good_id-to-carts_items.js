'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
    'Carts_Items',
    'stores_goods_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Carts_Items', 'stores_goods_id')
  }
}
