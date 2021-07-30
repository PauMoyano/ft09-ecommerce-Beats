const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("likes", {
    like: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idUser: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
}; 