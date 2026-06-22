import Groq from "groq-sdk";

// Fallback check to prevent crashing if the key is missing
const apiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: apiKey || "MISSING_KEY" });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  if (!process.env.GROQ_API_KEY) {
    console.error("❌ ERROR: GROQ_API_KEY is missing in your .env.local file!");
    return res.status(500).json({ result: "Backend Error: Missing GROQ_API_KEY in .env.local" });
  }

  try {
    const { prompt } = req.body;
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant", // Updated to the stable, ultra-fast model ID
    });

    res.status(200).json({ result: completion.choices[0]?.message?.content || "" });
  } catch (error) {
    console.error("❌ GROQ API CRASH ERROR:", error);
    res.status(500).json({ result: `API Error: ${error.message}` });
  }
}