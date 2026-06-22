export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { text } = req.body;

    const token = process.env.HF_TOKEN ? process.env.HF_TOKEN.trim() : "";

    const response = await fetch(
      "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
      {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );

    const result = await response.json();

    // If HF is still loading the model, handle the retry gracefully
    if (result.error && result.estimated_time) {
      return res.status(200).json({ data: [{ label: "LOADING_MODEL", score: 1.0 }, { label: "Please wait 10s for model to spin up", score: 0.0 }] });
    }

    // Format array output [[{label, score}]] or [{label, score}]
    let finalArray = [];
    if (Array.isArray(result) && Array.isArray(result[0])) {
      finalArray = result[0];
    } else if (Array.isArray(result)) {
      finalArray = result;
    }

    res.status(200).json({ data: finalArray });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}