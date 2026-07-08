const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mood: {
      type: String,
      required: true,
    },

    stress: {
      type: Number,
      required: true,
    },

    sleep: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mood", moodSchema);