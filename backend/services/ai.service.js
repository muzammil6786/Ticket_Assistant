const OpenAI = require("openai/index.mjs");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.processTicket = async (description) => {
  try {
    const prompt = `
You are an AI customer support assistant.

Analyze the support ticket and respond ONLY in valid JSON format.

Categories:
- PAYMENT (payment failed, refund, charged)
- LOGIN (password, OTP, authentication)
- BUG (errors, crashes, not working)
- OTHER (anything else)

Rules:
- Choose BEST matching category
- Generate a SHORT, PROFESSIONAL reply (2-3 lines)
- Reply should be HUMAN-LIKE and helpful
- Do NOT include extra text

Return JSON:
{
  "category": "",
  "reply": "",
  "confidence": 0.0
}

Ticket:
"${description}"
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7, // 🔥 adds creativity
    });

    let text = response.choices[0].message.content;

    //  CLEAN JSON (important)
    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text);
  } catch (err) {
    console.log("AI Error:", err.message);

    return fallbackResponse(description);
  }
};




function fallbackResponse(description) {
  const text = description.toLowerCase();

  if (text.includes("payment") || text.includes("charged")) {
    return {
      category: "PAYMENT",
      reply:
        "We understand your concern regarding the payment. Please share your transaction details so we can assist you further.",
      confidence: 0.6,
    };
  }

  if (text.includes("login") || text.includes("password")) {
    return {
      category: "LOGIN",
      reply:
        "It seems you're facing login issues. Please try resetting your password or let us know if the issue persists.",
      confidence: 0.6,
    };
  }

  if (text.includes("error") || text.includes("bug")) {
    return {
      category: "BUG",
      reply:
        "We’re sorry for the inconvenience caused. Our team is looking into this issue and will resolve it soon.",
      confidence: 0.6,
    };
  }

  return {
    category: "OTHER",
    reply:
      "Thank you for reaching out. Our support team will review your request and get back to you shortly.",
    confidence: 0.5,
  };
}