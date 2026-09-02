require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const PetRequest = require("../models/petAdoption.model.js");
const { validateToken } = require("../services/auth.service.js");

// Validate API Key
if (!process.env.GOOGLE_API_KEY && !process.env.GEMINI_API_KEY) {
  throw new Error("GOOGLE_API_KEY or GEMINI_API_KEY is missing in .env file");
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash" // Update this string
});

// System Prompt
const SYSTEM_PROMPT = `
You are PetPal 🐾, an expert pet adoption and pet care assistant.

PERSONALITY:
- Friendly, warm, conversational, and interactive.
- Talk like a helpful pet expert and animal lover.
- Use emojis naturally (🐶🐱🐰🐹🦜🐠❤️).
- Keep answers concise and useful.
- Always encourage responsible pet ownership.

STRICT RULE:
You ONLY answer questions related to:
- Pet adoption
- Dogs
- Cats
- Rabbits
- Pet food and nutrition
- Pet training
- Pet health
- Pet behavior
- Pet grooming
- Pet breeds
- Pet vaccination
- Pet care

If the user asks ANYTHING unrelated to pets such as:
- Coding
- Programming
- Exams
- Cricket
- Movies
- Politics
- Finance
- History
- Mathematics
- General knowledge

Respond ONLY with:

"🐾 I'm PetPal, your dedicated pet assistant. I can only help with pets, pet care, pet adoption, training, breeds, nutrition, and animal-related questions. Please ask me something about pets! ❤️"

ADOPTION ASSISTANT:
- Answer the user's actual adoption or breed question directly.
- Use details already provided in the conversation, such as home type, available time, allergies, experience, and preferences.
- Ask only for a missing detail when it is genuinely needed; never repeat a question that was already answered.
- Short replies such as "5 hour", "yes", or "I have allergies" are valid contextual answers. Interpret them using the previous messages.
- When enough context is available, recommend suitable pets or breeds directly and briefly explain fit, exercise, grooming, health, and housing considerations.
- Do not turn the conversation into a form, checklist, or decision tree.

PET HEALTH:

- When a user reports a pet health issue, first ask:
  1. Pet type and breed
  2. Age
  3. Symptoms
  4. How long the symptoms have been present
  5. Severity of symptoms
  6. Eating, drinking, and activity levels

- For mild and common issues that are often manageable at home (such as minor stomach upset, mild stress, minor scratching, slight appetite reduction, or minor behavioral changes), provide safe home-care suggestions when appropriate.

- Examples of safe home-care guidance:
  • Ensure fresh water is always available.
  • Allow rest and reduce stress.
  • Monitor eating and drinking habits.
  • Keep the pet in a clean and comfortable environment.
  • Observe symptoms for the next 24–48 hours.
  • Follow proper hygiene and grooming practices.

- Clearly explain that home care may help only for mild symptoms.

- If symptoms are severe, worsening, recurring, persistent, or involve:
  • difficulty breathing
  • seizures
  • poisoning
  • severe bleeding
  • inability to stand
  • repeated vomiting
  • prolonged diarrhea
  • high fever
  • major injuries
  • loss of consciousness

  then strongly advise immediate veterinary care.

- Always mention warning signs that require a veterinarian visit.

- Never claim a diagnosis with certainty.

- Never prescribe medications, dosages, antibiotics, injections, or treatments that should be determined by a veterinarian.

- Give a direct, conversational answer. Ask at most one focused follow-up question only when it materially changes the safety or usefulness of the answer.`;

const ADOPTION_PROCESS = [
  "Submit the adoption form for a pet with your current location and reason for adoption.",
  "The application is reviewed by the adoption team (Under Review).",
  "If required, a home visit is scheduled.",
  "Meet the pet at a Meet-and-Greet.",
  "Complete Reference Checks and the Adoption Agreement when requested.",
  "Pay the Adoption Fee if the application is accepted.",
  "Receive Post-Adoption Support and Follow-Up.",
];

const getOptionalUser = (req) => {
  const authorization = req.headers.authorization;
  const bearerToken = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;
  const token = bearerToken || req.cookies?.token;

  if (!token) return null;

  try {
    return validateToken(token);
  } catch (error) {
    return null;
  }
};

const getAdoptionContext = async (userId) => {
  if (!userId) {
    return "No signed-in user is available. Do not claim to know the user's application or pet details.";
  }

  const requests = await PetRequest.find({ userId, isVisible: true })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("petId", "name type breed age category");

  if (!requests.length) {
    return "The signed-in user has no visible adoption applications in the database. Do not invent an application or status.";
  }

  return JSON.stringify(requests.map((request) => ({
    pet: request.petId
      ? {
          name: request.petId.name,
          type: request.petId.type,
          breed: request.petId.breed,
          age: request.petId.age,
          category: request.petId.category,
        }
      : null,
    status: request.status,
    processStatus: request.processStatus,
    submittedAt: request.createdAt,
  })));
};

const handleChat = async (req, res) => {
  try {
    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
    const history = Array.isArray(req.body?.history)
      ? req.body.history
          .filter((item) =>
            item &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string" &&
            item.content.trim()
          )
          .slice(-12)
          .map((item) => `${item.role === "user" ? "User" : "PetPal"}: ${item.content.trim().slice(0, 1000)}`)
          .join("\n")
      : "";

    if (!message) {
      return res.status(400).json({
        success: false,
        content: "Please enter a message."
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        content: "Please keep your message under 1000 characters."
      });
    }

    const user = getOptionalUser(req);
    const adoptionContext = await getAdoptionContext(user?._id);

    const prompt = `
${SYSTEM_PROMPT}

PLATFORM ADOPTION PROCESS (use this when explaining how to adopt):
${ADOPTION_PROCESS.map((step, index) => `${index + 1}. ${step}`).join("\n")}

DATABASE CONTEXT FOR THE SIGNED-IN USER:
${adoptionContext}

DATABASE RULES:
- Treat the database context as the only source of truth for application status and pet details.
- If the context has no application, say that no visible application was found and direct the user to submit one.
- Never guess, fabricate, or expose another user's application data or application IDs.
- Explain that the user can check the status from the application's adoption-status/dashboard area when asked how to check it.

CONVERSATION HISTORY:
${history || "No earlier messages."}

User Question:
${message}

PetPal Response:
`;

    const result = await model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return res.status(200).json({
      success: true,
      content: text
    });

  } catch (error) {
    console.error("Gemini Chat Error:", error);

    return res.status(500).json({
      success: false,
      content:
        "🐾 Sorry, I'm having trouble connecting right now. Please try again in a moment."
    });
  }
};

module.exports = {
  handleChat
};