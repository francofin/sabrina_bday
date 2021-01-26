// requirements
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// declare that Comment inherits from the sequlize Model object
class Comment extends Model {}

// define structure of Comment
Comment.init(
    {
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize
    }
);


module.exports = Comment;