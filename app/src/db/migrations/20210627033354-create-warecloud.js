'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('warecloud', {
      id_warecloud: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(45)
      },
      password : Sequelize.STRING(200),
      first_name : {
         type : Sequelize.STRING(45),
      },
      last_name : {
         type : Sequelize.STRING(45),
      },
      email : {
         type : Sequelize.STRING(45),
      },
      address : {
         type : Sequelize.STRING(200),
      },
      address_detail : {
         type : Sequelize.STRING(500),
      },
      identity_number : {
         type : Sequelize.STRING(45),
      },
      id_city : {
         type : Sequelize.STRING(45),
      },
      phone : {
         type : Sequelize.STRING(45),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('warecloud');
  }
};