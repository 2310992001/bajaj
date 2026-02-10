const { filterPrimes } = require('../../utils/mathHelpers');
const { isIntegerArray } = require('../../utils/validators');
const config = require('../config');

/**
 * Prime Model
 * Handles prime number filtering with validation
 */
class PrimeModel {
    /**
     * Filter prime numbers from array
     * @param {number[]} arr - Array of numbers
     * @returns {Object} Result with data or error
     */
    static filter(arr) {
        // Validate input
        if (!isIntegerArray(arr)) {
            return {
                success: false,
                statusCode: 400,
                error: 'prime must be an array of integers'
            };
        }

        // Security: limit array size
        if (arr.length > config.limits.prime.maxArraySize) {
            return {
                success: false,
                statusCode: 400,
                error: `prime array must not exceed ${config.limits.prime.maxArraySize} elements`
            };
        }

        // Filter primes
        const result = filterPrimes(arr);

        return {
            success: true,
            statusCode: 200,
            data: result
        };
    }
}

module.exports = PrimeModel;
