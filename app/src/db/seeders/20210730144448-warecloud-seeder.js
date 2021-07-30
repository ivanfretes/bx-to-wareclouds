'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('warecloud', [
      { 
         id_warecloud : 'warecloud1',
         password : 'password',
         first_name : 'name 1',
         last_name : 'lastname 1',
         email : 'warecloud1@wareclouds.com',
         address : 'Principal',
         address_detail : 'Detalle',
         identity_number : '123456789',
         id_city : 1,
         phone : '123456',
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
