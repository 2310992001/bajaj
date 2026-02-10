/**
 * Application Configuration
 * Centralized configuration management
 */

module.exports = {
  // Server configuration
  port: process.env.PORT || 4000,

  // Official email
  officialEmail: process.env.OFFICIAL_EMAIL || 'nitesh2001.be23@chitkara.edu.in',

  // Security limits
  limits: {
    fibonacci: {
      max: 1000
    },
    prime: {
      maxArraySize: 10000
    },
    lcm: {
      maxArraySize: 100
    },
    hcf: {
      maxArraySize: 100
    },
    ai: {
      maxQuestionLength: 1000
    },
    requestPayload: '10kb',
    requestTimeout: 30000 // 30 seconds
  },

  // Gemini API configuration
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-1.5-flash'
  },

  // Allowed operation keys
  allowedOperations: ['fibonacci', 'prime', 'lcm', 'hcf', 'AI']
};
