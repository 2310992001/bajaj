const config = require('../config');

/**
 * Health Controller
 * Handles health check endpoint
 */
class HealthController {
    /**
     * Health check endpoint handler
     * @param {Object} req - Express request
     * @param {Object} res - Express response
     */
    static check(req, res) {
        res.status(200).json({
            is_success: true,
            official_email: config.officialEmail
        });
    }
}

module.exports = HealthController;
