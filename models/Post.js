// requirements
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// declare that Post inherits from the sequlize Model object
class Post extends Model {
    static upvote(body, models) {
      return models.Vote.create({
        user_id: body.user_id,
        post_id: body.post_id
      }).then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            'id',
            'title',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
              'vote_count'
            ]
          ]
        });
      });
    }
  }

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