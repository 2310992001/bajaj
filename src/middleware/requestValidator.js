const { validateRequestBody } = require('../../utils/validators');
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
 * Request Validator Middleware
 * Validates the request body structure and extracts operation details
 */
function requestValidator(req, res, next) {
    // Validate request body structure
    const validation = validateRequestBody(req.body);

    if (!validation.valid) {
        return res.status(400).json(errorResponse(validation.error));
    }

    // Attach validated data to request for controller use
    req.validatedData = {
        operation: validation.key,
        value: req.body[validation.key]
    };

    next();
}

module.exports = requestValidator;
