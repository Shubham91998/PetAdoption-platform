const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");

dotenv.config();

const connectDB = require("./utils/db");

const petRoute = require("./routes/pet.routes");
const userRoute = require("./routes/user.routes");
const originalpetRoute = require("./routes/originalpet.routes");
const aiRoutes = require("./routes/ai.routes");
const shelterRoutes = require("./routes/shelter.routes");

// Grooming Routes (jab create kar lo)
const providerRoutes = require("./routes/providerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const chatRoutes = require("./routes/chatRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const socketHandler = require("./socket/socketHandler");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://pet-adoption-tan-six.vercel.app",
  "https://pet-adoption-platform-six.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 8001;

// Socket.IO
const io = require("socket.io")(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketHandler(io);

const startServer = async () => {
  try {
    console.log("=== Server Starting ===");

    const URI = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!URI) {
      throw new Error("MONGODB_URI not found in .env");
    }

    console.log("✅ MONGODB_URI found");
    console.log("Connecting to MongoDB...");

    await connectDB(URI);

    console.log(`AI provider configured:
OpenAI=${!!process.env.OPENAI_API_KEY},
Google=${!!process.env.GOOGLE_API_KEY}`);

    // Existing Routes
    app.use("/original/pets", originalpetRoute);
    app.use("/pets", petRoute);
    app.use("/user", userRoute);
    app.use("/api/ai", aiRoutes);
    app.use("/api/shelters", shelterRoutes);

    // Grooming Marketplace Routes
    app.use("/api/providers", providerRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/chat", chatRoutes);
    app.use("/api/reviews", reviewRoutes);

    // Static Files
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname, "../frontend/dist/index.html")
      );
    });

    // IMPORTANT
    server.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
      console.log(`🔌 Socket.IO Ready`);
    });

  } catch (error) {
    console.error("❌ Startup Failed");
    console.error(error);
    process.exit(1);
  }
};

startServer();