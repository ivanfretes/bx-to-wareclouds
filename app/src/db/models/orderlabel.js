"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class OrderLabel extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         const { Order, Label } = models;
         OrderLabel.belongsTo(Order, { foreignKey: "id_order" });
         OrderLabel.belongsTo(Label, { foreignKey: "id_label" });
      }
   }
   OrderLabel.init(
      {
         id_label: {
            type: DataTypes.INTEGER({ length: 11 }),
            primaryKey: true,
            allowNull: false,
         },
         id_order: {
            type: DataTypes.INTEGER({ length: 11 }),
            primaryKey: true,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: "OrderLabel",
         tableName: "order_label",
      }
   );
   return OrderLabel;
};
