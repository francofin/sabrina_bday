const User = require('./User');
const Post = require('./Post');
const Image = require('./Image');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasOne (Image, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Post.belongsTo(Category, {
    foreignKey:'category_id',
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



module.exports = {
    User,
    Post,
    Image,
    Comment
};