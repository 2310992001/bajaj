const healthRoutes = require('./healthRoutes');
const bfhlRoutes = require('./bfhlRoutes');

/**
 * Central Route Aggregator
 * Combines all route modules
 */
function registerRoutes(app) {
    // Register health routes
    app.use('/', healthRoutes);

    // Register BFHL routes
    app.use('/', bfhlRoutes);
}

module.exports = registerRoutes;
