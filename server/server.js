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

app.listen(PORT,"0.0.0.0" ,() => {
  console.log(`Server running on port ${PORT}`);
});

// const streakRoutes = require("./routes/streakRoutes");

// app.use("/api/streak", streakRoutes);

const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);



const statisticsRoutes = require("./routes/statisticsRoutes");

app.use("/api/statistics", statisticsRoutes);

const resourceRoutes = require("./routes/resourceRoutes");
app.use("/api/resources", resourceRoutes);