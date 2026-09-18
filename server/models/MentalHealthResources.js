const mongoose = require("mongoose");

const mentalHealthResourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    address: String,

    city: String,

    district: String,

    state: String,

    country: String,

    phone: String,

    latitude: Number,

    longitude: Number,

    verified: {
      type: Boolean,
      default: false,
    },

    verificationSource: String,

    verificationNote: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MentalHealthResource",
  mentalHealthResourceSchema,
  "mentalhealthresources"
);