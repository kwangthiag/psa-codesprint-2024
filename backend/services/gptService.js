// services/gptService.js
require('dotenv').config();
const axios = require('axios');
// import OpenAI from 'openai';
// const client = new OpenAI();

// Function to convert text to JSON with specific sections using GPT
async function parsePdfContentToSections(text) {
  try {
    console.log('PDF Text Length:', text.length);
    const prompt = `
        Extract and organize the following PDF content into the following sections:

        - name
        - email
        - phone_number
        - skills
        
        Content: ${text}
        
        Respond with a JSON object containing these sections, even if some sections are empty or not present.
    `;
    

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in parsePdfContentToSections:', error.response ? error.response.data : error.message);
    throw new Error('Failed to parse PDF content into sections');
  }
}

module.exports = { parsePdfContentToSections };
