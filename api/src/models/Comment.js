const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("comment", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
