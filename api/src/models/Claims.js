const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("claims", {
    claimStatus: {
      type: DataTypes.ENUM("consultation", "I can wait", "do not take payment", "I can not buy", "urgent"),
      defaultValue: "consultation"
    },
    userId: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    claim: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};