'use strict'
module.exports = function (sequelize, DataTypes) {
  var Carts_Item = sequelize.define('Carts_Item', {
    goods_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER,
    stores_goods_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  })
  Carts_Item.associate = function (models) {
    Carts_Item.belongsTo(models.Cart, {foreignKey: 'cart_id'})
    Carts_Item.belongsTo(models.Store, {foreignKey: 'store_id'})
    Carts_Item.belongsTo(models.Good, {foreignKey: 'goods_id'})
    Carts_Item.belongsTo(models.Stores_Good, {foreignKey: 'stores_goods_id'})
  }
  return Carts_Item
}
