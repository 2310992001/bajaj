const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config');

/**
 * AI Service
 * Handles Google Gemini API integration
 */
class AIService {
    /**
     * Get a single-word AI response using Google Gemini
     * @param {string} question - The question to ask
     * @returns {Promise<string>} Single-word response
     */
    static async getResponse(question) {
        const apiKey = config.gemini.apiKey;

        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not configured');
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: config.gemini.model });

        const prompt = `Answer the following question with ONLY a single word. Do not include any punctuation, explanation, or additional text. Just one word.

Question: ${question}

Single-word answer:`;

        const result = await model.generateContent(prompt);
        const response = result.response.text().trim();

        // Extract the first word if multiple words were returned
        const singleWord = response.split(/\s+/)[0].replace(/[^a-zA-Z0-9]/g, '');

        return singleWord || response;
    }
}

module.exports = AIService;
