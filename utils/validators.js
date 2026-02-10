/**
 * Validate that a value is a positive integer
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid positive integer
 */
function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

/**
 * Validate that a value is a non-negative integer
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid non-negative integer
 */
function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

/**
 * Validate that a value is an array of integers
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid integer array
 */
function isIntegerArray(value) {
  return Array.isArray(value) && 
         value.length > 0 && 
         value.every(item => Number.isInteger(item));
}

/**
 * Validate that a value is an array of positive integers
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid positive integer array
 */
function isPositiveIntegerArray(value) {
  return Array.isArray(value) && 
         value.length > 0 && 
         value.every(item => Number.isInteger(item) && item > 0);
}

/**
 * Validate that a value is a non-empty string
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid non-empty string
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Sanitize string input to prevent injection attacks
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  // Remove potentially dangerous characters while preserving question content
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '')    // Remove remaining angle brackets
    .trim()
    .substring(0, 1000);     // Limit length
}

/**
 * Get allowed keys for POST /bfhl
 * @returns {string[]} Allowed keys
 */
function getAllowedKeys() {
  return ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
}

/**
 * Validate request body has exactly one allowed key
 * @param {object} body - Request body
 * @returns {{ valid: boolean, key: string|null, error: string|null }}
 */
function validateRequestBody(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, key: null, error: 'Request body must be a JSON object' };
  }

  const allowedKeys = getAllowedKeys();
  const presentKeys = Object.keys(body).filter(key => allowedKeys.includes(key));

  if (presentKeys.length === 0) {
    return { 
      valid: false, 
      key: null, 
      error: `Request must contain exactly one of: ${allowedKeys.join(', ')}` 
    };
  }

  if (presentKeys.length > 1) {
    return { 
      valid: false, 
      key: null, 
      error: 'Request must contain exactly one operation key' 
    };
  }

  return { valid: true, key: presentKeys[0], error: null };
}

module.exports = {
  isPositiveInteger,
  isNonNegativeInteger,
  isIntegerArray,
  isPositiveIntegerArray,
  isNonEmptyString,
  sanitizeString,
  getAllowedKeys,
  validateRequestBody
};
