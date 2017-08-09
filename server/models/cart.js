'use strict'
module.exports = function (sequelize, DataTypes) {
  var Cart = sequelize.define('Cart', {
    user_id: DataTypes.INTEGER
  })
  Cart.associate = function (models) {
    Cart.belongsTo(models.Member, {foreignKey: 'user_id'})
    Cart.hasMany(models.Carts_Item, {foreignKey: 'cart_id'})
  }
  return Cart
}
