const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          stars: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          review: {
            type: DataTypes.TEXT,
            allowNull: false
          }
    });
};
