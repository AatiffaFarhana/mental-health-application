import { useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function MoodChart({ moods }) {
  const [view, setView] = useState("weekly");

  if (!moods || moods.length === 0) return null;

  // Sort by oldest -> newest
  const sortedMoods = [...moods].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const weeklyData = sortedMoods.slice(-7);
  const monthlyData = sortedMoods.slice(-30);

  const displayData =
    view === "weekly"
      ? weeklyData
      : monthlyData;

  const moodScore = {
    Happy: 6,
    Calm: 5,
    Neutral: 4,
    Sad: 3,
    Anxious: 2,
    Stressed: 1,
  };

  const labels = displayData.map((item) =>
    new Date(item.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    })
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Mood Level",
        data: displayData.map(
          (item) => moodScore[item.mood]
        ),
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        min: 1,
        max: 6,

        ticks: {
          callback(value) {
            return {
              1: "Stressed",
              2: "Anxious",
              3: "Sad",
              4: "Neutral",
              5: "Calm",
              6: "Happy",
            }[value];
          },
        },
      },
    },
  };

  // Statistics based on selected view
  const totalEntries = displayData.length;

  const averageStress =
    totalEntries > 0
      ? (
          displayData.reduce(
            (sum, item) => sum + item.stress,
            0
          ) / totalEntries
        ).toFixed(1)
      : 0;

  const averageSleep =
    totalEntries > 0
      ? (
          displayData.reduce(
            (sum, item) => sum + item.sleep,
            0
          ) / totalEntries
        ).toFixed(1)
      : 0;

  const latestMood =
    totalEntries > 0
      ? displayData[displayData.length - 1].mood
      : "-";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-center mb-8">
        Mood Analytics
      </h2>

      <div className="flex justify-center gap-5 mb-8">

        <button
          onClick={() => setView("weekly")}
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            view === "weekly"
              ? "bg-emerald-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Weekly
        </button>

        <button
          onClick={() => setView("monthly")}
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            view === "monthly"
              ? "bg-emerald-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Monthly
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-emerald-50 rounded-xl p-5 text-center shadow">

          <h3 className="text-3xl font-bold text-emerald-700">
            {totalEntries}
          </h3>

          <p>
            Entries
          </p>

        </div>

        <div className="bg-blue-50 rounded-xl p-5 text-center shadow">

          <h3 className="text-3xl font-bold text-blue-700">
            {averageStress}
          </h3>

          <p>
            Average Stress
          </p>

        </div>

        <div className="bg-yellow-50 rounded-xl p-5 text-center shadow">

          <h3 className="text-3xl font-bold text-yellow-700">
            {averageSleep}
          </h3>

          <p>
            Average Sleep
          </p>

        </div>

        <div className="bg-purple-50 rounded-xl p-5 text-center shadow">

          <h3 className="text-2xl font-bold text-purple-700">
            {latestMood}
          </h3>

          <p>
            Latest Mood
          </p>

        </div>

      </div>

      <div className="h-[450px]">

        <Line
          data={data}
          options={options}
        />

      </div>

    </div>
  );
}

export default MoodChart;