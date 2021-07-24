'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    id_order: {
      type: DataTypes.INTEGER({ length : 11 }),
   order_code : DataTypes.STRING(20),
   id_ecommerce : {
      type : DataTypes.STRING(45),
   },
   id_warecloud : {
      type : DataTypes.STRING(45),
   },
   id_route : {
      type : DataTypes.INTEGER(11)
   },
   id_status_order : {
      type : DataTypes.INTEGER(11)
   },
   first_name : {
      type : DataTypes.STRING(45),
   },
   last_name : {
      type : DataTypes.STRING(45),
   },
   email : {
      type : DataTypes.STRING(45),
   },
   address : {
      type : DataTypes.STRING(200),
   },
   address_detail : {
      type : DataTypes.STRING(500),
   },
   address_extra_info : {
      type : DataTypes.STRING(500),
   },
   id_city : {
      type : DataTypes.INTEGER({length : 11})
   },
   id_country : {
      type : DataTypes.INTEGER({length : 11})
   },
   phone : {
      type : DataTypes.STRING(45),
   }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};