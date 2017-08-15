'use strict'
module.exports = function (sequelize, DataTypes) {
  var Stores_Good = sequelize.define('Stores_Good', {
    store_id: DataTypes.INTEGER,
    good_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  })
  Stores_Good.associate = function (models) {
    Stores_Good.hasMany(models.Carts_Item, {foreignKey: 'stores_goods_id'})
    Stores_Good.belongsTo(models.Store, {foreignKey: 'store_id'})
    Stores_Good.belongsTo(models.Good, {foreignKey: 'good_id'})
  }
  return Stores_Good
}
