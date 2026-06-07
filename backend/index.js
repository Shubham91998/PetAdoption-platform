const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

const connectDB = require("./utils/db");

const petRoute = require("./routes/pet.routes");
const userRoute = require("./routes/user.routes");
const originalpetRoute = require("./routes/originalpet.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(cors({
  origin: "https://pet-adoption-tan-six.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 8001;

const startServer = async () => {
  try {
    console.log("=== Server Starting ===");

    const URI = process.env.MONGODB_URI;

    if (!URI) {
      throw new Error("MONGODB_URI not found in .env");
    }

    console.log("✅ MONGODB_URI found");
    console.log("Connecting to MongoDB...");

    await connectDB(URI);

    console.log(`AI provider configured:
OpenAI=${!!process.env.OPENAI_API_KEY},
Google=${!!process.env.GOOGLE_API_KEY}`);

    app.use("/original/pets", originalpetRoute);
    app.use("/pets", petRoute);
    app.use("/user", userRoute);
    app.use("/api/ai", aiRoutes);

    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Startup Failed");
    console.error(error);
    process.exit(1);
  }
};

startServer();