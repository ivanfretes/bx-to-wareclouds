module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("status_order", {
         id_status_order: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         status_order_name: {
            type: Sequelize.STRING(45),
         },
         status_order_description: {
            type: Sequelize.STRING(200),
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("status_order");
   },
};
