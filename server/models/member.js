'use strict'
module.exports = function (sequelize, DataTypes) {
  var Member = sequelize.define('Member', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  })
  Member.associate = function (models) {
    Member.hasMany(models.Cart, {foreignKey: 'user_id'})
  }

  return Member
}
