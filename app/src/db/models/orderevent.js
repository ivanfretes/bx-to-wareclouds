'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderEvent.init({
     id_order_event : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    id_order : {
     type : DataTypes.INTEGER({ length : 11 }),
   },
   user : {
      type : DataTypes.STRING(45)
   },
   id_status_order : {
      type : DataTypes.INTEGER({ length : 11 })
   },
   id_role : {
      type : DataTypes.INTEGER({ length : 11 })
   },
   comment : {
      type : DataTypes.STRING(200),
   },
   receptor_name : {
      type : DataTypes.STRING(45),
   }
  }, {
    sequelize,
    modelName: 'OrderEvent',
    tableName : 'order_event'
  });
  return OrderEvent;
};