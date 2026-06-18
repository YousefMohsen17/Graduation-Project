const Groq = require('groq-sdk');
// Initialize Groq client

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY 
});

exports.chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "YOUR_GROQ_API_KEY_HERE") {
        return res.status(500).json({ message: "Groq API key is not configured in backend." });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful and knowledgeable AI study assistant for engineering students. Answer questions clearly and concisely."
        },
        {
          role: "user",
          content: question
        }
      ],
      model: "llama-3.1-8b-instant", 
      temperature: 0.5,
    });

    const answer = chatCompletion.choices[0]?.message?.content || "No answer generated";
    
    res.json({ answer });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "Failed to process AI request" });
  }
};
