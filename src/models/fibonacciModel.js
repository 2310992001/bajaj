const { fibonacci } = require('../../utils/mathHelpers');
const { isPositiveInteger } = require('../../utils/validators');
const config = require('../config');

/**
 * Fibonacci Model
 * Handles fibonacci series generation with validation
 */
class FibonacciModel {
    /**
     * Generate fibonacci series
     * @param {number} n - Number of terms
     * @returns {Object} Result with data or error
     */
    static generate(n) {
        // Validate input
        if (!isPositiveInteger(n)) {
            return {
                success: false,
                statusCode: 400,
                error: 'fibonacci must be a positive integer'
            };
        }

        // Security: limit to prevent DoS
        if (n > config.limits.fibonacci.max) {
            return {
                success: false,
                statusCode: 400,
                error: `fibonacci value must not exceed ${config.limits.fibonacci.max}`
            };
        }

        // Generate fibonacci series
        const result = fibonacci(n);

        return {
            success: true,
            statusCode: 200,
            data: result
        };
    }
}

module.exports = FibonacciModel;
