// requirements
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// declare that Comment inherits from the sequlize Model object
class Image extends Model { }

// define structure of Comment
Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        file_type: {
            type: DataTypes.STRING,
            allowNull:true
        },
        name: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.STRING,
            allowNull:true,
        },
    },
    {
    sequelize,
    timestamps:true,
    freezeTableName: true, 
    underscored: true, 
    modelName: 'image'
    }
);


module.exports = Image;