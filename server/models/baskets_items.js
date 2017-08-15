'use strict'
module.exports = function (sequelize, DataTypes) {
  var Baskets_Item = sequelize.define('Baskets_Item', {
    goods_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    basket_id: DataTypes.INTEGER
  })
  Baskets_Item.associate = function (models) {
    Baskets_Item.belongsTo(models.Basket, {foreignKey: 'basket_id'})
  }
  return Baskets_Item
}
