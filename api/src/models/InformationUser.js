const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("informationUser", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
