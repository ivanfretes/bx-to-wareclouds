'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('status_order', [
      { 
         id_status_order: 6,
         status_order_name:"Listo para entregar",
         createdAt: new Date(),
         updatedAt: new Date()
      },
      { 
         id_status_order: 17,
         status_order_name:"En camino a consumidor por courier externo",
         createdAt: new Date(),
         updatedAt: new Date()
      },
      { 
         id_status_order: 18,
         status_order_name:"Devuelto a warecloud por courier externo",
         createdAt: new Date(),
         updatedAt: new Date()
      },
      { 
         id_status_order: 19,
         status_order_name:"Pedido dañado por courier externo",
         createdAt: new Date(),
         updatedAt: new Date()
      },
      { 
         id_status_order: 20,
         status_order_name:"Entregado a consumidor por courier externo",
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
