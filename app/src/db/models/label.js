const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Label extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   Label.init(
      {
         id_label: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         order_label_link: {
            type: DataTypes.STRING(255),
         },
         expiration_date: {
            type: DataTypes.DATE,
         },
         label_raw: {
            type: DataTypes.STRING,
         },
      },
      {
         sequelize,
         modelName: "Label",
         tableName: "label",
      }
   );
   return Label;
};
