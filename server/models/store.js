'use strict'
module.exports = function(sequelize, DataTypes) {
  var Store = sequelize.define('Store', {
    name: DataTypes.STRING,
    lat_long: DataTypes.ARRAY(DataTypes.DECIMAL)
  })
  Store.associate = function (models) {
    Store.hasMany(models.Stores_Good, {foreignKey: 'store_id'})
    Store.hasMany(models.Carts_Item, {foreignKey: 'store_id'})
  }
  return Store
}
