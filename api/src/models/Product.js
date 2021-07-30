const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    reproductions: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    bpm: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    scale: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Em",
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "01/01/1987",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    audio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
