'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ecommerce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ecommerce.init({
   id_commerce: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
   },
   password : DataTypes.STRING(200),
   ecommerce_name : {
      type : DataTypes.STRING(45),
   },
   tax_registry_number : {
      type : DataTypes.STRING(45),
   }
  }, {
    sequelize,
    modelName: 'Ecommerce',
    tableName : 'ecommerce'
  });
  return Ecommerce;
};