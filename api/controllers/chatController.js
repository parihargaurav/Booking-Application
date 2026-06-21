const { GoogleGenerativeAI } = require("@google/generative-ai");
const Place = require("../models/Place");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Cache the formatted hotel inventory for a short window so a burst of
// chat messages doesn't hammer the database on every single request.
const CACHE_TTL_MS = 60 * 1000;
let placesCache = { context: null, expiresAt: 0 };

function formatPlacesContext(places) {
  if (!places.length) {
    return "There are currently no hotels listed on TicketEasy.";
  }
  return places
    .map((p, i) => {
      const facilities = p.perks?.length ? p.perks.join(", ") : "none listed";
      return [
        `${i + 1}. ${p.title} (listing id: ${p._id})`,
        `   Address: ${p.address}`,
        `   Price: ₹${p.price} per night`,
        `   Max guests: ${p.maxGuests}`,
        `   Check-in: ${p.checkIn || "not specified"} | Check-out: ${p.checkOut || "not specified"}`,
        `   Facilities: ${facilities}`,
        `   Description: ${p.description || "No description provided."}`,
        `   Extra info: ${p.extraInfo || "None."}`,
      ].join("\n");
    })
    .join("\n\n");
}

async function getPlacesContext() {
  const now = Date.now();
  if (placesCache.context && now < placesCache.expiresAt) {
    return placesCache.context;
  }
  const places = await Place.find().limit(100).lean();
  const context = formatPlacesContext(places);
  placesCache = { context, expiresAt: now + CACHE_TTL_MS };
  return context;
}

function buildSystemInstruction(clientPersona, hotelContext) {
  return `${clientPersona || "You are the TicketEasy hotel assistant."}

You must answer ONLY using the hotel inventory listed below — this is the real, live data from the TicketEasy database. Follow these rules strictly:
- Never invent hotels, prices, addresses, facilities, or availability that are not in the data below.
- If the user asks about something this data doesn't cover (general travel tips, hotels not listed here, unrelated topics), say you don't have that information on TicketEasy and suggest they browse the listings or contact support — do not guess or make something up.
- When asked about price, quote the exact "Price" value per night from the matching listing.
- When asked about amenities or facilities, only mention items from that listing's "Facilities" field.
- When recommending hotels (e.g. "cheapest", "best for families", "has wifi"), reason only over the listings provided.
- Keep responses short, friendly, and focused on helping the user choose or book a hotel on TicketEasy.

Current hotel inventory on TicketEasy:
${hotelContext}`;
}

async function generateWithRetry(model, payload, retries = 2) {
  try {
    return await model.generateContent(payload);
  } catch (err) {
    if (err.status === 429 && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return generateWithRetry(model, payload, retries - 1);
    }
    throw err;
  }
}

exports.createChat = async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages are required." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Gemini API key is not configured." });
  }

  try {
    const clientSystemMessage = messages.find((m) => m.role === "system");
    const conversation = messages.filter((m) => m.role !== "system");

    const hotelContext = await getPlacesContext();
    const systemInstruction = buildSystemInstruction(
      clientSystemMessage?.content,
      hotelContext
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
    });

    const chatHistory = conversation.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const result = await generateWithRetry(model, {
      contents: chatHistory,
      generationConfig: {
        temperature: 0.4, // lower temperature keeps it factual/grounded instead of creative
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