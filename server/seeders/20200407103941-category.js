'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Categories', [
        {
          name: 'Backlog',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Development',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Product',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Completed',
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Categories', null, {});
  }
};
