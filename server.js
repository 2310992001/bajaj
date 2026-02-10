require('dotenv').config();
const createApp = require('./src/app');
const config = require('./src/config');

/**
 * BFHL API Server
 * Entry point for the application
 */

// Create Express app
const app = createApp();

// Start server
app.listen(config.port, () => {
  console.log(`BFHL API server running on port ${config.port}`);
  console.log(`Health check: http://localhost:${config.port}/health`);
  console.log(`POST endpoint: http://localhost:${config.port}/bfhl`);
});

module.exports = app;
