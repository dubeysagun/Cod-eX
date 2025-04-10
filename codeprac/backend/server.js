require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post("/generate", async (req, res) => {
    const { difficulty, topic } = req.body;
    const prompt = `Generate a ${difficulty} level question on ${topic} with test cases.`;
    try {
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        res.json({ question: response });
    } catch (error) {
        res.status(500).json({ error: "Error generating question." });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));