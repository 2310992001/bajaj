const express = require('express');
const cors = require('cors');
const config = require('./config');
const registerRoutes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

/**
 * Express Application Setup
 * Configures middleware and routes
 */
function createApp() {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json({ limit: config.limits.requestPayload }));

    // Security: Remove sensitive headers
    app.disable('x-powered-by');

    // Request timeout middleware
    app.use((req, res, next) => {
        req.setTimeout(config.limits.requestTimeout);
        next();
    });

    // Register all routes
    registerRoutes(app);

    // Handle 404 for undefined routes
    app.use(notFoundHandler);

    // Global error handler (must be last)
    app.use(errorHandler);

    return app;
}

module.exports = createApp;
