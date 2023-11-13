const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

//logic
//user has many Blogs
//Blog belong to one user
//user has many comments
//comment belong to one user
//Blog has many comments
//comment belong to one Blog

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

    Blog.belongsTo(User, {
    foreignKey: 'user_id',
    });

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete:"CASCADE",
});

Blog.hasMany(Comment, {
    foreignKey: 'Blog_id',
    onDelete: 'CASCADE',
});

    Comment.belongsTo(Blog, {
    foreignKey: 'Blog_id',
    });

module.exports = { User, Blog, Comment };