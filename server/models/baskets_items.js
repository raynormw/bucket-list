'use strict'
module.exports = function (sequelize, DataTypes) {
  var Baskets_Item = sequelize.define('Baskets_Item', {
    goods_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    basket_id: DataTypes.INTEGER
  })
  Baskets_Item.associate = function (models) {
    Baskets_Item.belongsTo(models.Basket, {foreignKey: 'basket_id'})
    Baskets_Item.belongsTo(models.Good, {foreignKey: 'goods_id'})
  }
  return Baskets_Item
}
