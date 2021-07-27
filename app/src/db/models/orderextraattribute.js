'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderExtraAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderExtraAttribute.init({
      id_order_extra_attribute: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      id_order : {
         type : DataTypes.INTEGER({ length : 11 }),
      },
      tracking_code : {
         type : DataTypes.STRING(45),
      }
  }, {
    sequelize,
    modelName: 'OrderExtraAttribute',
    tableName : 'order_extra_attribute'
  });
  return OrderExtraAttribute;
};