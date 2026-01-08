// Import required Express.js middleware and dependencies
const express = require('express');
const cors = require('cors');           // Enable Cross-Origin Resource Sharing
const bodyParser = require('body-parser'); // Parse JSON request bodies
const db = require('./db'); // Import the database connection
const apiRouter = require('./routes'); //Import the API routes
// Set port from environment variable or default to 3000
const port = process.env.PORT || 3000;
const app = express();

// Middleware: Enable CORS for all routes and parse JSON bodies
app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter); // Mount the API routes at /api prefix
// Basic route: GET endpoint at root path
app.get('/', (req, res) => {
  res.send('Hello world!!!');
});

// Database connection and server startup sequence
// First authenticate connection to PostgreSQL database
db.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL.');
    // Sync database models (creates tables if they don't exist)
    return db.sync();
  })
  .then(() => {
    console.log('Database synchronized, starting server!');
    // Only start Express server after successful database connection and sync
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    // Handle database connection errors
    console.error('Unable to connect to DB');
    console.error(err);
  });