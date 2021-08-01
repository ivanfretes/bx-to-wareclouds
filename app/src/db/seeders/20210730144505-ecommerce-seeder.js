"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert("ecommerce", [
         {
            id_ecommerce: "ecommerce1",
            password: "password1",
            ecommerce_name: "ecommerce 1",
            tax_registry_number: "16256526-5",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id_ecommerce: "ecommerce2",
            password: "password2",
            ecommerce_name: "ecommerce 2",
            tax_registry_number: "6882994-1",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id_ecommerce: "ecommerce3",
            password: "password3",
            ecommerce_name: "ecommerce 3",
            tax_registry_number: "14135689-5",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
   },

   down: async (queryInterface, Sequelize) => {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
   },
};
