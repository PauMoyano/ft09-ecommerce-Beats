const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("messages", {
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    userFrom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });
};