const express = require("express");
const router = express.Router();

const MentalHealthResource = require("../models/MentalHealthResources");

function calculateDistance(lat1, lon1, lat2, lon2) {

  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  return (
    R *
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  );

}

router.get("/", async (req, res) => {

  try {

    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);

    const hospitals = await MentalHealthResource.find();

    const result = hospitals.map((h) => ({

      ...h.toObject(),

      distance: calculateDistance(
        lat,
        lon,
        h.latitude,
        h.longitude
      ),

    }));

    result.sort((a, b) => a.distance - b.distance);

    res.json(result.slice(0, 10));

  }

  catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Unable to fetch hospitals",
    });

  }

});

module.exports = router;