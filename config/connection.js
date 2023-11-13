const Sequelize = require('sequelize');

require('dotenv').config();

const connectionString = process.env.JAWSDB_URL;


// Create a Sequelize instance using the connection string
const sequelize = new Sequelize(connectionString);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;



