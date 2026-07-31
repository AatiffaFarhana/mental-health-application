// const Mood = require("../models/Mood");

// const getMoodStreak = async (req, res) => {
//   try {
//     const moods = await Mood.find({ user: req.user.id })
//       .sort({ createdAt: -1 });

//     if (moods.length === 0) {
//       return res.json({
//         currentStreak: 0,
//         longestStreak: 0,
//       });
//     }

//     const uniqueDates = [];

//     moods.forEach((mood) => {
//       const date = mood.createdAt.toISOString().split("T")[0];

//       if (!uniqueDates.includes(date)) {
//         uniqueDates.push(date);
//       }
//     });

//     let current = 1;
//     let longest = 1;

//     for (let i = 1; i < uniqueDates.length; i++) {

//       const today = new Date(uniqueDates[i - 1]);
//       const yesterday = new Date(uniqueDates[i]);

//       const diff =
//         (today - yesterday) / (1000 * 60 * 60 * 24);

//       if (diff === 1) {
//         current++;
//       } else {
//         break;
//       }
//     }

//     let temp = 1;

//     for (let i = 1; i < uniqueDates.length; i++) {

//       const d1 = new Date(uniqueDates[i - 1]);
//       const d2 = new Date(uniqueDates[i]);

//       const diff =
//         (d1 - d2) / (1000 * 60 * 60 * 24);

//       if (diff === 1) {
//         temp++;
//       } else {
//         temp = 1;
//       }

//       longest = Math.max(longest, temp);
//     }

//     res.json({
//       currentStreak: current,
//       longestStreak: longest,
//     });

//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };

// module.exports = {
//   getMoodStreak,
// };