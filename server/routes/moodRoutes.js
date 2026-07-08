const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  saveMood,
  getMoodHistory,
  deleteMood,
  updateMood,
  getMoodStats,
} = require("../controllers/moodController");

router.post("/", protect, saveMood);

router.get("/", protect, getMoodHistory);

router.get("/stats", protect, getMoodStats);

router.delete("/:id", protect, deleteMood);

router.put("/:id", protect, updateMood);

module.exports = router;