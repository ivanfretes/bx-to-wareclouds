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
         // define association here
      }
   }
   OrderLabel.init(
      {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         id_label: {
            type: DataTypes.INTEGER({ length: 11 }),
         },
         id_order: {
            type: DataTypes.INTEGER({ length: 11 }),
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
