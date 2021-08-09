module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("order_label", {
         id_label: {
            type: Sequelize.INTEGER({ length: 11 }),
            primaryKey: true,
            allowNull: false,
         },
         id_order: {
            type: Sequelize.INTEGER({ length: 11 }),
            primaryKey: true,
            allowNull: false,
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
