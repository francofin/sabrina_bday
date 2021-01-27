const User = require('./User');
const Post = require('./Post');
const Image = require('./Image');
const Comment = require('./Comment');
const Vote = require('./Vote');

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasOne (Image, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});


Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Comment.belongsTo(Post, {
foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
  });
  
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
  });
  
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

module.exports = {
    User,
    Post,
    Image,
    Comment,
    Vote
};