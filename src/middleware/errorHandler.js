const config = require('../config');

/**
 * Error Response Helper
 * @param {string} message - Error message
 * @returns {Object} Error response
 */
function errorResponse(message) {
    return {
        is_success: false,
        official_email: config.officialEmail,
        error: message
    };
}

/**
 * Global Error Handler Middleware
 * Handles all unhandled errors in the application
 */
function errorHandler(err, req, res, next) {
    console.error('Unhandled Error:', err.message);

    // Handle JSON parsing errors
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json(errorResponse('Invalid JSON in request body'));
    }

    // Handle payload too large
    if (err.type === 'entity.too.large') {
        return res.status(413).json(errorResponse('Request payload too large'));
    }

    // Generic server error
    res.status(500).json(errorResponse('Internal server error'));
}

/**
 * 404 Not Found Handler
 */
function notFoundHandler(req, res) {
    res.status(404).json(errorResponse('Endpoint not found'));
}

module.exports = {
    errorHandler,
    notFoundHandler
};
