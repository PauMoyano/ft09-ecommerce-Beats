const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("coupons", {
    coupon: {
      type: DataTypes.STRING,
      unique: true

    },
   
    discount: {
        type: DataTypes.DECIMAL,
        defaultValue:0
      },
  });
}; 