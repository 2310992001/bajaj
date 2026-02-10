const AIService = require('../services/aiService');
const { isNonEmptyString, sanitizeString } = require('../../utils/validators');

/**
 * AI Model
 * Handles AI question processing with validation
 */
class AIModel {
    /**
     * Process AI question
     * @param {string} question - Question to ask AI
     * @returns {Object} Result with data or error
     */
    static async processQuestion(question) {
        // Validate input
        if (!isNonEmptyString(question)) {
            return {
                success: false,
                statusCode: 400,
                error: 'AI must be a non-empty string question'
            };
        }

        // Sanitize input
        const sanitizedQuestion = sanitizeString(question);
        if (sanitizedQuestion.length === 0) {
            return {
                success: false,
                statusCode: 400,
                error: 'AI question contains invalid content'
            };
        }

        try {
            // Get AI response
            const result = await AIService.getResponse(sanitizedQuestion);

            return {
                success: true,
                statusCode: 200,
                data: result
            };
        } catch (error) {
            console.error('AI Error:', error.message);
            return {
                success: false,
                statusCode: 503,
                error: 'AI service temporarily unavailable'
            };
        }
    }
}

module.exports = AIModel;
