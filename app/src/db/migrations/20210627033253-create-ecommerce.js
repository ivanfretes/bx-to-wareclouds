module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("ecommerce", {
         id_ecommerce: {
            primaryKey: true,
            type: Sequelize.STRING(45),
            allowNull: false,
         },
         ecommerce_name: {
            type: Sequelize.STRING(45),
         },
         password: {
            type: Sequelize.STRING,
         },
         tax_registry_number: {
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
      await queryInterface.dropTable("ecommerce");
   },
};
