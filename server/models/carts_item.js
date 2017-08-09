'use strict';
module.exports = function(sequelize, DataTypes) {
  var Carts_Item = sequelize.define('Carts_Item', {
    goods_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Carts_Item;
};