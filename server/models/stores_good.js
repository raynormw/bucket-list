'use strict';
module.exports = function(sequelize, DataTypes) {
  var Stores_Good = sequelize.define('Stores_Good', {
    store_id: DataTypes.INTEGER,
    good_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Stores_Good;
};