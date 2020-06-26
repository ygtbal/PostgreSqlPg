'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Businesses',
      'regCode',
      Sequelize.STRING,
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Businesses',
      'regCode'
    )
  }
};
