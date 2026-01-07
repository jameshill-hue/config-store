// Import Sequelize ORM for database operations
const { Sequelize } = require('sequelize');

// Create Sequelize instance using database URL from environment variable
// DB_URL format: postgresql://user:password@host:port/database
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres', // Specify PostgreSQL as the database dialect
});

// Export the Sequelize instance for use in other modules
module.exports = sequelize;