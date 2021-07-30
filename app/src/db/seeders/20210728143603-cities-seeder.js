'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('cities', [
         { 
            city_name:"Ciudad 1",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         { 
            city_name:"Ciudad 2",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         { 
            city_name:"Metropolitana de Santiago",
            createdAt: new Date(),
            updatedAt: new Date()
         },
         { 
         
            city_name:"Ciudad 4",
            createdAt: new Date(),
            updatedAt: new Date()
         }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
