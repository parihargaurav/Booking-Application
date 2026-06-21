const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.createChat = async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages are required." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Gemini API key is not configured." });
  }

  try {
    // Pull the system prompt out — Gemini wants it separately, not in `contents`
    const systemMessage = messages.find((m) => m.role === "system");
    const conversation = messages.filter((m) => m.role !== "system");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // currently supported model
      systemInstruction: systemMessage?.content,
    });

    // Convert remaining messages to Gemini format
    const chatHistory = conversation.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const result = await model.generateContent({
      contents: chatHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    const assistantMessage = result.response.text();

    res.json({ message: { role: "assistant", content: assistantMessage } });
  } catch (error) {
    console.error("Chat error:", error);
    const message = error.message || "Chat service failed.";
    res.status(500).json({ error: message });
  }
};