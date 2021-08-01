module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("order_label", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         id_label: {
            type: Sequelize.INTEGER({ length: 11 }),
         },
         id_order: {
            type: Sequelize.INTEGER({ length: 11 }),
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
      await queryInterface.dropTable("order_label");
   },
};
