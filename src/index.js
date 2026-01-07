// Import required Express.js middleware and dependencies
const express = require('express');
const cors = require('cors');           // Enable Cross-Origin Resource Sharing
const bodyParser = require('body-parser'); // Parse JSON request bodies

// Set port from environment variable or default to 3000
const port = process.env.PORT || 3000;
const app = express();

// Middleware: Enable CORS for all routes and parse JSON bodies
app.use(cors());
app.use(bodyParser.json());

// Basic route: GET endpoint at root path
app.get('/', (req, res) => {
  res.send('Hello world!!!');
});

// Start the Express server and listen on specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});