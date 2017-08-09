'use strict';
module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define('Member', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Member;
};