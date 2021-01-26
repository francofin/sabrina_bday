// requirements
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Category = require('./Category');

// declare that Post inherits from the sequlize Model object
class Post extends Model { }

// define structure of Post
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10]
            }
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);


module.exports = Post;