'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    name: DataTypes.STRING,
    regCode: DataTypes.STRING,
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
  };
  return Business;
};