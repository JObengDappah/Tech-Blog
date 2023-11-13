const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Blog extends Model {}

Blog.init(
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
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Blog',
  }
);
// Synchronize the model with the database to create the 'Blog' table
(async () => {
  try {
    await sequelize.sync();
    console.log('Blog table created successfully.');
  } catch (error) {
    console.error('Error creating the Blog table:', error);
  }
})();
module.exports = Blog;