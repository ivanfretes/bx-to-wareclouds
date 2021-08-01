"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Warecloud extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   Warecloud.init(
      {
         id_warecloud: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(45),
         },
         password: DataTypes.STRING(200),
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
         identity_number: {
            type: DataTypes.STRING(45),
         },
         id_city: {
            type: DataTypes.STRING(45),
         },
         phone: {
            type: DataTypes.STRING(45),
         },
      },
      {
         sequelize,
         modelName: "Warecloud",
         tableName: "warecloud",
      }
   );
   return Warecloud;
};
