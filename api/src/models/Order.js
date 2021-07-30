const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    orderStatus: {
      type: DataTypes.ENUM("cart", "create", "process", "cancel", "complete"),
      defaultValue: "cart"
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};