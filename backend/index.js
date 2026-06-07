const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./utils/db");
const petRoute = require("./routes/pet.routes");
const userRoute = require("./routes/user.routes");
const originalpetRoute = require("./routes/originalpet.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

dotenv.config({ path: path.join(__dirname, '.env') });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pet-adoption-tan-six.vercel.app"
    ],
    credentials: true,
  })
);


const PORT = process.env.PORT || 8001;
const URI = process.env.MongoDBURI;

const startServer = async () => {
  try {
    await connectDB(URI);
    console.log("Mongodb Connected");
    console.log(`AI provider configured: OpenAI=${!!process.env.OPENAI_API_KEY}, Google=${!!process.env.GOOGLE_API_KEY}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }

  app.use("/original/pets", originalpetRoute);
  app.use("/pets", petRoute);
  app.use("/user", userRoute);

app.use("/api/ai", aiRoutes);

  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
