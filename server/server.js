const express = require("express");
const cors = require("cors");
const moodRoutes = require("./routes/moodRoutes");

require("dotenv").config();


const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/moods", moodRoutes);

app.get("/", (req, res) => {
  res.send("Mental Health API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});