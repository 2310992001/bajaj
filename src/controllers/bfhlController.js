const FibonacciModel = require('../models/fibonacciModel');
const PrimeModel = require('../models/primeModel');
const MathModel = require('../models/mathModel');
const AIModel = require('../models/aiModel');
const config = require('../config');

/**
 * BFHL Controller
 * Handles main API endpoint operations
 */
class BFHLController {
    /**
     * Create success response
     * @param {*} data - Response data
     * @returns {Object} Success response
     */
    static successResponse(data) {
        return {
            is_success: true,
            official_email: config.officialEmail,
            data
        };
    }

    /**
     * Create error response
     * @param {string} message - Error message
     * @returns {Object} Error response
     */
    static errorResponse(message) {
        return {
            is_success: false,
            official_email: config.officialEmail,
            error: message
        };
    }

    /**
     * Main BFHL endpoint handler
     * @param {Object} req - Express request
     * @param {Object} res - Express response
     */
    static async handleRequest(req, res) {
        try {
            const { operation, value } = req.validatedData;

            let result;

            // Route to appropriate model based on operation
            switch (operation) {
                case 'fibonacci':
                    result = FibonacciModel.generate(value);
                    break;

                case 'prime':
                    result = PrimeModel.filter(value);
                    break;

                case 'lcm':
                    result = MathModel.calculateLCM(value);
                    break;

                case 'hcf':
                    result = MathModel.calculateHCF(value);
                    break;

                case 'AI':
                    result = await AIModel.processQuestion(value);
                    break;

                default:
                    return res.status(400).json(
                        BFHLController.errorResponse('Invalid operation')
                    );
            }

            // Handle result
            if (result.success) {
                return res.status(result.statusCode).json(
                    BFHLController.successResponse(result.data)
                );
            } else {
                return res.status(result.statusCode).json(
                    BFHLController.errorResponse(result.error)
                );
            }
        } catch (error) {
            console.error('Controller Error:', error.message);
            return res.status(500).json(
                BFHLController.errorResponse('Internal server error')
            );
        }
    }
}

module.exports = BFHLController;
