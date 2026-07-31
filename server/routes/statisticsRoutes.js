const express = require("express");
const router = express.Router();

const Mood = require("../models/Mood");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id });

    if (moods.length === 0) {
      return res.json({
        totalEntries: 0,
        averageStress: 0,
        averageSleep: 0,
        latestMood: "-",
        mostFrequentMood: "-",
      });
    }

    const totalEntries = moods.length;

    const averageStress =
      moods.reduce((sum, m) => sum + m.stress, 0) / totalEntries;

    const averageSleep =
      moods.reduce((sum, m) => sum + m.sleep, 0) / totalEntries;

    const latestMood = moods.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0].mood;

    const moodCounts = {};

    moods.forEach((m) => {
      moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
    });

    const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) =>
      moodCounts[a] > moodCounts[b] ? a : b
    );

    res.json({
      totalEntries,
      averageStress: averageStress.toFixed(1),
      averageSleep: averageSleep.toFixed(1),
      latestMood,
      mostFrequentMood,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;