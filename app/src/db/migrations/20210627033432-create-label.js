module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("label", {
         id_label: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         order_label_link: {
            type: Sequelize.STRING(255),
         },
         expiration_date: {
            type: Sequelize.DATE,
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
      await queryInterface.dropTable("label");
   },
};
