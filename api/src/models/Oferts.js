const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("oferts", {
    name: {
      type: DataTypes.STRING,
      defaultValue: "none"
    },
    ofertStatus: {
        type: DataTypes.ENUM("none", "day", "week", "month", "season", "holiday"),
        defaultValue: "none"
      },
    discount: {
        type: DataTypes.DECIMAL,
        defaultValue:0
      },
  });
}; 