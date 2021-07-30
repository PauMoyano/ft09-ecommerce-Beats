const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("orderLine", {
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    price:{
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
    subtotal:{
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
    orderId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product:{
        type:DataTypes.JSON,
        allowNull:true
      }
  });
};