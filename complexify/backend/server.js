// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // To load environment variables

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// Your GeminiAPI key from .env
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://api.gemini.com/analyze'; // Update with the correct API URL from Gemini

// Endpoint for analyzing code
// app.post('/analyze', async (req, res) => {
//   const { code } = req.body;
  
//   if (!code) {
//     return res.status(400).json({ message: 'Code is required' });
//   }

//   try {
//     // Send the code to GeminiAPI
//     const response = await axios.post(
//       GEMINI_API_URL,
//       { code },
//       {
//         headers: {
//           'Authorization': `Bearer ${GEMINI_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     // Extract complexity information from the API response
//     const { timeComplexity, spaceComplexity } = response.data;

//     // Send back the complexity data
//     res.json({ timeComplexity, spaceComplexity });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Error analyzing code', error: error.message });
//   }
// });
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        time_complexity: {
          type: "string"
        },
        space_complexity: {
          type: "string"
        }
      },
      required: [
        "time_complexity",
        "space_complexity"
      ]
    },
  };
  
  app.post('/analyse', async (req, res) => {
    const { code } = req.body;
  
    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }
  
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              { text: `give me time and space complexity of this code\n${code}\n` },
            ],
          },
        ],
      });
  
      const result = await chatSession.sendMessage("run");
      const { time_complexity, space_complexity } = JSON.parse(result.response.text());
  
      res.json({ time_complexity, space_complexity });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error analyzing code', error: error.message });
    }
  });
  
  // ...existing code...



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
