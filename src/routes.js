// Import Express Router to create modular route handlers
const express = require('express');
// Import the KV model for database operations
const { KV } = require('./models');

// Create a new Express Router instance for API routes
const apiRouter = express.Router();

// GET /api/kv - Retrieve all key-value pairs
// Returns: JSON array of all key-value entries
apiRouter.get('/kv', async (req, res) => {
  try {
    // Find all records in the KV table
    const kvs = await KV.findAll();
    // Return successful response with data
    return res.json({ data: kvs });
  } catch (err) {
    // Handle any database errors
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/kv/:key - Retrieve a specific key-value pair by key
// Params: key (in URL path)
// Returns: JSON object with the key-value pair, or 404 if not found
apiRouter.get('/kv/:key', async (req, res) => {
  // Extract key from URL parameters
  const { key } = req.params;

  try {
    // Find one record where key matches the parameter
    const kv = await KV.findOne({ where: { key } });

    if (kv) {
      // Return the found key-value pair
      return res.json({ data: kv });
    } else {
      // Return 404 if key doesn't exist
      return res.status(404).json({ error: 'key not found' });
    }
  } catch (err) {
    // Handle any database errors
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/kv - Create a new key-value pair
// Body: { key: string, value: string }
// Returns: JSON object with the created key-value pair, or 400 if key exists
apiRouter.post('/kv', async (req, res) => {
  // Extract key and value from request body
  const { key, value } = req.body;

  // Validate that both key and value are provided
  if (!key || !value) {
    return res
      .status(400)
      .json({ error: 'both key and value fields are required.' });
  }

  try {
    // Check if key already exists in database
    const existingKv = await KV.findOne({ where: { key } });

    if (existingKv) {
      // Return 400 if key already exists (prevent duplicates)
      return res.status(400).json({ error: 'key already present in DB.' });
    } else {
      // Create new key-value pair in database
      const newKv = await KV.create({ key, value });
      // Return 201 (Created) with the new record
      return res.status(201).json({ data: newKv });
    }
  } catch (err) {
    // Handle any database errors
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/kv/:key - Update an existing key-value pair
// Params: key (in URL path)
// Body: { value: string }
// Returns: JSON object with updated key-value pair, or 404 if key not found
apiRouter.put('/kv/:key', async (req, res) => {
  // Extract key from URL parameters and value from request body
  const { key } = req.params;
  const { value } = req.body;

  // Validate that value is provided
  if (!value) {
    return res.status(400).json({ error: 'value field is required.' });
  }

  try {
    // Update the value for the specified key
    // Returns array: [numberOfUpdatedRows, arrayOfUpdatedRows]
    const [updatedCount] = await KV.update({ value }, { where: { key } });

    if (updatedCount > 0) {
      // If update was successful, fetch and return the updated record
      const updatedKv = await KV.findOne({ where: { key } });

      if (updatedKv) {
        return res.json({ data: updatedKv });
      } else {
        // Edge case: update succeeded but record not found
        return res.status(404).json({ error: 'key not found' });
      }
    } else {
      // No rows updated means key doesn't exist
      return res.status(404).json({ error: 'key not found' });
    }
  } catch (err) {
    // Handle any database errors
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/kv/:key - Delete a key-value pair
// Params: key (in URL path)
// Returns: 204 No Content if successful, or 404 if key not found
apiRouter.delete('/kv/:key', async (req, res) => {
  // Extract key from URL parameters
  const { key } = req.params;

  try {
    // Delete the record with matching key
    // Returns number of deleted rows
    const deleted = await KV.destroy({ where: { key } });

    if (deleted > 0) {
      // Return 204 No Content (successful deletion, no body)
      return res.sendStatus(204);
    } else {
      // Return 404 if key doesn't exist
      return res.status(404).json({ error: 'key not found' });
    }
  } catch (err) {
    // Handle any database errors
    return res.status(500).json({ error: err.message });
  }
});

// Export the router to be used in index.js
module.exports = apiRouter;