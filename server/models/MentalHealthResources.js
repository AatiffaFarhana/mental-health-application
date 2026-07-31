const mongoose = require("mongoose");

const mentalHealthResourceSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  city: String,

  district: String,

  latitude: Number,

  longitude: Number,

});

module.exports = mongoose.model(
  "MentalHealthResource",
  mentalHealthResourceSchema,
  "mentalhealthresources"
);