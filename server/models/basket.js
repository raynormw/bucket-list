'use strict'
module.exports = function (sequelize, DataTypes) {
  var Basket = sequelize.define('Basket', {
    member_id: DataTypes.INTEGER
  })
  Basket.associate = function (models) {
    Basket.hasMany(models.Baskets_Item, {foreignKey: 'basket_id'})
  }
  return Basket
}
