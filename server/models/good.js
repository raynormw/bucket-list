'use strict'
module.exports = function (sequelize, DataTypes) {
  var Good = sequelize.define('Good', {
    name: DataTypes.STRING,
    url_pict: DataTypes.STRING,
    desc: DataTypes.TEXT,
    barcode: DataTypes.INTEGER
  })
  Good.associate = function (models) {
    Good.hasMany(models.Stores_Good, {foreignKey: 'good_id'})
    Good.hasMany(models.Carts_Item, {foreignKey: 'goods_id'})
  }
  return Good
}
