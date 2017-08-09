'use strict';
module.exports = function(sequelize, DataTypes) {
  var Store = sequelize.define('Store', {
    name: DataTypes.STRING,
    lat_long: DataTypes.ARRAY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Store;
};