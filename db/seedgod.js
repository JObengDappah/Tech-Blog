const sequelize = require('../config/config');
const User = require('../models/User');
const seedBlogData = require('../models/Blog'); // Import the Blog.js function
const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // After users are created, execute the function to populate the Blog table
    await seedBlogData(users);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedDatabase();