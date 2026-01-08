// Import Sequelize DataTypes for defining model field types
const { DataTypes } = require('sequelize');
// Import the database connection instance
const sequelize = require('./db');

// Define the Key-Value (KV) model using Sequelize
// This model represents a table in PostgreSQL for storing key-value pairs
const KV = sequelize.define('KV', {
  // Key field: unique identifier for the value
  key: {
    type: DataTypes.STRING,  // String data type in database
    allowNull: false,        // Field is required (cannot be null)
    unique: true,            // Each key must be unique in the database
  },
  // Value field: the data associated with the key
  value: {
    type: DataTypes.STRING,  // String data type in database
    allowNull: false,        // Field is required (cannot be null)
  },
});

// Export the KV model for use in routes and other modules
module.exports = { KV };
  