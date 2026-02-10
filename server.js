require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { fibonacci, filterPrimes, lcm, hcf } = require('./utils/mathHelpers');
const { getAIResponse } = require('./utils/aiHelper');
const { 
  isPositiveInteger, 
  isIntegerArray, 
  isPositiveIntegerArray,
  isNonEmptyString, 
  sanitizeString, 
  validateRequestBody 
} = require('./utils/validators');

const app = express();
const PORT = process.env.PORT || 3000;

// Your Chitkara email - UPDATE THIS
const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || 'your_email@chitkara.edu.in';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit payload size for security

// Security: Remove sensitive headers
app.disable('x-powered-by');

// Request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(30000); // 30 seconds timeout
  next();
});

/**
 * Create success response
 */
function successResponse(data) {
  return {
    is_success: true,
    official_email: OFFICIAL_EMAIL,
    data
  };
}

/**
 * Create error response
 */
function errorResponse(message) {
  return {
    is_success: false,
    official_email: OFFICIAL_EMAIL,
    error: message
  };
}

/**
 * GET /health - Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

/**
 * POST /bfhl - Main API endpoint
 * Handles: fibonacci, prime, lcm, hcf, AI operations
 */
app.post('/bfhl', async (req, res) => {
  try {
    // Validate request body structure
    const validation = validateRequestBody(req.body);
    if (!validation.valid) {
      return res.status(400).json(errorResponse(validation.error));
    }

    const key = validation.key;
    const value = req.body[key];

    // Process based on operation type
    switch (key) {
      case 'fibonacci': {
        // Validate: must be a positive integer
        if (!isPositiveInteger(value)) {
          return res.status(400).json(
            errorResponse('fibonacci must be a positive integer')
          );
        }
        // Security: limit to prevent DoS
        if (value > 1000) {
          return res.status(400).json(
            errorResponse('fibonacci value must not exceed 1000')
          );
        }
        const result = fibonacci(value);
        return res.status(200).json(successResponse(result));
      }

      case 'prime': {
        // Validate: must be an array of integers
        if (!isIntegerArray(value)) {
          return res.status(400).json(
            errorResponse('prime must be an array of integers')
          );
        }
        // Security: limit array size
        if (value.length > 10000) {
          return res.status(400).json(
            errorResponse('prime array must not exceed 10000 elements')
          );
        }
        const result = filterPrimes(value);
        return res.status(200).json(successResponse(result));
      }

      case 'lcm': {
        // Validate: must be an array of positive integers
        if (!isPositiveIntegerArray(value)) {
          return res.status(400).json(
            errorResponse('lcm must be an array of positive integers')
          );
        }
        // Security: limit array size
        if (value.length > 100) {
          return res.status(400).json(
            errorResponse('lcm array must not exceed 100 elements')
          );
        }
        const result = lcm(value);
        return res.status(200).json(successResponse(result));
      }

      case 'hcf': {
        // Validate: must be an array of positive integers
        if (!isPositiveIntegerArray(value)) {
          return res.status(400).json(
            errorResponse('hcf must be an array of positive integers')
          );
        }
        // Security: limit array size
        if (value.length > 100) {
          return res.status(400).json(
            errorResponse('hcf array must not exceed 100 elements')
          );
        }
        const result = hcf(value);
        return res.status(200).json(successResponse(result));
      }

      case 'AI': {
        // Validate: must be a non-empty string
        if (!isNonEmptyString(value)) {
          return res.status(400).json(
            errorResponse('AI must be a non-empty string question')
          );
        }
        // Sanitize input
        const sanitizedQuestion = sanitizeString(value);
        if (sanitizedQuestion.length === 0) {
          return res.status(400).json(
            errorResponse('AI question contains invalid content')
          );
        }
        
        try {
          const result = await getAIResponse(sanitizedQuestion);
          return res.status(200).json(successResponse(result));
        } catch (aiError) {
          console.error('AI Error:', aiError.message);
          // Return 503 for AI service unavailable
          return res.status(503).json(
            errorResponse('AI service temporarily unavailable')
          );
        }
      }

      default:
        // This should never happen due to validation, but handle gracefully
        return res.status(400).json(
          errorResponse('Invalid operation')
        );
    }
  } catch (error) {
    console.error('Server Error:', error.message);
    // Generic error - don't expose internal details
    return res.status(500).json(
      errorResponse('Internal server error')
    );
  }
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json(errorResponse('Endpoint not found'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  
  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json(errorResponse('Invalid JSON in request body'));
  }
  
  // Handle payload too large
  if (err.type === 'entity.too.large') {
    return res.status(413).json(errorResponse('Request payload too large'));
  }
  
  res.status(500).json(errorResponse('Internal server error'));
});

// Start server
app.listen(PORT, () => {
  console.log(`BFHL API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`POST endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;
