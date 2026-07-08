// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// function MoodChart({ moodHistory =[]}) {

//   const data = {
//     labels: moodHistory.map((item) => item.date),

//     datasets: [
//       {
//         label: "Stress Level",

//         data: moodHistory.map((item) => item.stress),

//         borderColor: "#059669",

//         backgroundColor: "#6EE7B7",

//         tension: 0.4,

//         fill: true,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,

//     plugins: {
//       legend: {
//         display: true,
//       },
//     },

//     scales: {
//       y: {
//         min: 0,
//         max: 10,
//       },
//     },
//   };

//   return (
//     <div className="bg-white dark:bg-[#23372E] rounded-3xl shadow-xl p-8 mt-8">

//       <h2 className="text-2xl font-bold text-emerald-700 dark:text-green-300 mb-6">
//         Weekly Stress Trend
//       </h2>

//       <Line
//         data={data}
//         options={options}
//       />

//     </div>
//   );
// }

// export default MoodChart;
import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function MoodChart({ moods }) {
  if (!moods || moods.length === 0) {
    return (
      <div className="text-center py-10">
        No mood data available.
      </div>
    );
  }

  // Last 7 entries
  const weekly = [...moods].slice(-7);

  const labels = weekly.map((item) =>
    new Date(item.createdAt).toLocaleDateString("en-IN", {
      weekday: "short",
    })
  );

  const moodScore = {
    Happy: 6,
    Calm: 5,
    Neutral: 4,
    Sad: 3,
    Anxious: 2,
    Stressed: 1,
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Mood Level",
        data: weekly.map((item) => moodScore[item.mood]),

        borderColor: "#10b981",

        backgroundColor: "rgba(16,185,129,0.2)",

        tension: 0.4,

        fill: true,

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
          callback: function (value) {
            const names = {
              1: "Stressed",
              2: "Anxious",
              3: "Sad",
              4: "Neutral",
              5: "Calm",
              6: "Happy",
            };

            return names[value];
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Weekly Mood Analytics
      </h2>

      <div className="h-[450px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default MoodChart;