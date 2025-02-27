const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const petRoute = require("./routes/pet");
const userRoute = require("./routes/user");
const originalpetRoute = require("./routes/originalpet")
const path = require("path")

const app = express();

dotenv.config();

const _dirname = path.resolve()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const PORT = process.env.PORT || 8001;

const URI = process.env.MongoDBURI;

try {
  mongoose.connect(URI);
  console.log("Mongodb Connected");
} catch (error) {
  console.log("Error: ", error);
}
app.use("/original/pets", originalpetRoute)
app.use("/pets", petRoute);
app.use("/user", userRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (req, res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
