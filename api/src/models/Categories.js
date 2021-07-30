const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('categories', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              len:{
                args: [2,12],
                msg: 'invalid category name length'
              }
            }
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false
          }
    },{
        timestamps: false
    });
};
