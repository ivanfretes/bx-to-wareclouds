module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("order", {
         id_order: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         order_code: {
            unique: true,
            type: Sequelize.STRING(20),
         },
         id_ecommerce: {
            type: Sequelize.STRING(45),
         },
         id_warecloud: {
            type: Sequelize.STRING(45),
         },
         id_route: {
            type: Sequelize.INTEGER(11),
         },
         id_status_order: {
            type: Sequelize.INTEGER(11),
         },
         first_name: {
            type: Sequelize.STRING(45),
         },
         last_name: {
            type: Sequelize.STRING(45),
         },
         email: {
            type: Sequelize.STRING(45),
         },
         address: {
            type: Sequelize.STRING(200),
         },
         address_detail: {
            type: Sequelize.STRING(500),
         },
         address_extra_info: {
            type: Sequelize.STRING(500),
         },
         id_city: {
            type: Sequelize.INTEGER({ length: 11 }),
         },
         id_country: {
            type: Sequelize.INTEGER({ length: 11 }),
         },
         phone: {
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
      await queryInterface.dropTable("order");
   },
};
