const { lcm, hcf } = require('../../utils/mathHelpers');
const { isPositiveIntegerArray } = require('../../utils/validators');
const config = require('../config');

/**
 * Math Model
 * Handles LCM and HCF calculations with validation
 */
class MathModel {
    /**
     * Calculate LCM of array
     * @param {number[]} arr - Array of positive integers
     * @returns {Object} Result with data or error
     */
    static calculateLCM(arr) {
        // Validate input
        if (!isPositiveIntegerArray(arr)) {
            return {
                success: false,
                statusCode: 400,
                error: 'lcm must be an array of positive integers'
            };
        }

        // Security: limit array size
        if (arr.length > config.limits.lcm.maxArraySize) {
            return {
                success: false,
                statusCode: 400,
                error: `lcm array must not exceed ${config.limits.lcm.maxArraySize} elements`
            };
        }

        // Calculate LCM
        const result = lcm(arr);

        return {
            success: true,
            statusCode: 200,
            data: result
        };
    }

    /**
     * Calculate HCF of array
     * @param {number[]} arr - Array of positive integers
     * @returns {Object} Result with data or error
     */
    static calculateHCF(arr) {
        // Validate input
        if (!isPositiveIntegerArray(arr)) {
            return {
                success: false,
                statusCode: 400,
                error: 'hcf must be an array of positive integers'
            };
        }

        // Security: limit array size
        if (arr.length > config.limits.hcf.maxArraySize) {
            return {
                success: false,
                statusCode: 400,
                error: `hcf array must not exceed ${config.limits.hcf.maxArraySize} elements`
            };
        }

        // Calculate HCF
        const result = hcf(arr);

        return {
            success: true,
            statusCode: 200,
            data: result
        };
    }
}

module.exports = MathModel;
