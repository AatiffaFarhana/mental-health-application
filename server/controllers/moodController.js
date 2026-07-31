const Mood = require("../models/Mood");

// Save Mood
const saveMood = async (req, res) => {
  try {
    const { mood, stress, sleep } = req.body;

    if (!mood || stress === undefined || sleep === undefined) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const newMood = await Mood.create({
      user: req.user.id,
      mood,
      stress,
      sleep,
    });
    //console.log("Mood saved",newMood);

    res.status(201).json({
      message: "Mood saved successfully",
      mood: newMood,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Mood History
const getMoodHistory = async (req, res) => {
  try {
    const moods = await Mood.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Mood
const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({
        message: "Mood entry not found",
      });
    }

    // Ensure the mood belongs to the logged-in user
    if (mood.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Mood.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Mood deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Mood
const updateMood = async (req, res) => {
  try {
    const { mood, stress, sleep } = req.body;

    const moodEntry = await Mood.findById(req.params.id);

    if (!moodEntry) {
      return res.status(404).json({
        message: "Mood entry not found",
      });
    }

    if (moodEntry.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    moodEntry.mood = mood;
    moodEntry.stress = stress;
    moodEntry.sleep = sleep;

    await moodEntry.save();

    res.status(200).json({
      message: "Mood updated successfully",
      mood: moodEntry,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Mood Statistics
const getMoodStats = async (req, res) => {
  try {

    const moods = await Mood.find({
      user: req.user.id,
    }).sort({ createdAt: 1 });

    const stats = {
      Happy: 0,
      Calm: 0,
      Neutral: 0,
      Sad: 0,
      Anxious: 0,
      Stressed: 0,
    };

    moods.forEach((item) => {
      if (stats[item.mood] !== undefined) {
        stats[item.mood]++;
      }
    });

    res.json(stats);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  saveMood,
  getMoodHistory,
  deleteMood,
  updateMood,
  getMoodStats,
};