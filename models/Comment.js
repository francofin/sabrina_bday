const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    // columns will go here
    id: {
        // use the special Sequelize DataTypes object provide what type of data it is
    type: DataTypes.INTEGER,
    // this is the equivalent of SQL's `NOT NULL` option
    allowNull: false,
    // instruct that this is the Primary Key
    primaryKey: true,
    // turn on auto increment
    autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          //length of comment must be at least 10 letters long
            len: [10]
          }
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;