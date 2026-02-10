const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Get a single-word AI response using Google Gemini
 * @param {string} question - The question to ask
 * @returns {Promise<string>} Single-word response
 */
async function getAIResponse(question) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Answer the following question with ONLY a single word. Do not include any punctuation, explanation, or additional text. Just one word.

Question: ${question}

Single-word answer:`;

  const result = await model.generateContent(prompt);
  const response = result.response.text().trim();
  
  // Extract the first word if multiple words were returned
  const singleWord = response.split(/\s+/)[0].replace(/[^a-zA-Z0-9]/g, '');
  
  return singleWord || response;
}

module.exports = {
  getAIResponse
};
