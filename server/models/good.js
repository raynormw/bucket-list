'use strict';
module.exports = function(sequelize, DataTypes) {
  var Good = sequelize.define('Good', {
    name: DataTypes.STRING,
    url_pict: DataTypes.STRING,
    desc: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Good;
};