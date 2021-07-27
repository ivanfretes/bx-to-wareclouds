'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StatusOrder.init({
      id_status_order: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: DataTypes.INTEGER
      },
      status_order_name : {
         type : DataTypes.STRING(45),
      },
      status_order_description : {
         type : DataTypes.STRING(200),
      }
  }, {
    sequelize,
    modelName: 'StatusOrder',
    tableName : 'status_order'
  });
  return StatusOrder;
};