const { Model, fn } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Order extends Model {
      static associate(models) {
         const { Ecommerce, Warecloud, OrderEvent, OrderExtraAttribute, City } =
            models;
         Order.belongsTo(Ecommerce, { foreignKey: "id_ecommerce" });
         Order.belongsTo(Warecloud, { foreignKey: "id_warecloud" });
         Order.hasMany(OrderEvent, { foreignKey: "id_order" });
         Order.hasOne(OrderExtraAttribute, { foreignKey: "id_order" });
         Order.belongsTo(City, { foreignKey: "id_city" });
      }
   }

   Order.init(
      {
         id_order: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         order_code: {
            unique: true,
            type: DataTypes.STRING(20),
         },
         id_ecommerce: {
            type: DataTypes.STRING(45),
         },
         id_warecloud: {
            type: DataTypes.STRING(45),
         },
         id_route: {
            type: DataTypes.INTEGER(11),
         },
         id_status_order: {
            type: DataTypes.INTEGER(11),
         },
         first_name: {
            type: DataTypes.STRING(45),
         },
         last_name: {
            type: DataTypes.STRING(45),
         },
         email: {
            type: DataTypes.STRING(45),
         },
         address: {
            type: DataTypes.STRING(200),
         },
         address_detail: {
            type: DataTypes.STRING(500),
         },
         address_extra_info: {
            type: DataTypes.STRING(500),
         },
         id_city: {
            type: DataTypes.INTEGER({ length: 11 }),
         },
         id_country: {
            type: DataTypes.INTEGER({ length: 11 }),
         },
         phone: {
            type: DataTypes.STRING(45),
         },
         createdAt: {
            type: DataTypes.DATE,
            defaultValue: fn("now"),
         },
         updatedAt: {
            type: DataTypes.DATE,
            defaultValue: fn("now"),
         },
      },
      {
         sequelize,
         modelName: "Order",
         tableName: "order",
      }
   );

   return Order;
};
