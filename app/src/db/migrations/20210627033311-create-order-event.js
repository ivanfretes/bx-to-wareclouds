module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("order_event", {
         id_order_event: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         id_order: {
            type: Sequelize.INTEGER({ length: 11 }),
         },
         user: {
            type: Sequelize.STRING(45),
         },
         id_status_order: {
            type: Sequelize.INTEGER({ length: 11 }),
         },
         id_role: {
            type: Sequelize.INTEGER({ length: 11 }),
         },
         comment: {
            type: Sequelize.STRING(200),
         },
         receptor_name: {
            type: Sequelize.STRING(45),
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
      await queryInterface.dropTable("order_event");
   },
};
