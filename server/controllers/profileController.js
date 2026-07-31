const Mood = require("../models/Mood");

const getProfile = async (req, res) => {
  try {

    const moods = await Mood.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      name: req.user.name,
      email: req.user.email,
      moodCount: moods.length,
      latestMood: moods.length ? moods[0].mood : "No moods yet",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getProfile,
};