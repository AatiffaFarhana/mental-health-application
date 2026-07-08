import { useEffect, useState } from "react";
import api from "../api/api";

function MoodHistory({ entries, fetchMoods }) {
  // const [moods, setMoods] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [editingMood, setEditingMood] = useState(null);

  const [editData, setEditData] = useState({
    mood: "",
    stress: 5,
    sleep: 8,
  });
  

  // const fetchMoods = async () => {
  //   try {
  //     const res = await api.get("/moods");
  //     setMoods(res.data);
  //   } catch (err) {
  //     console.log(err);
  //     alert("Unable to load mood history.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mood entry?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/moods/${id}`);

      // Refresh mood history
      fetchMoods();

      alert("Mood deleted successfully!");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Unable to delete mood.");
    }
  };

  const handleEdit = (mood) => {
    setEditingMood(mood);

    setEditData({
      mood: mood.mood,
      stress: mood.stress,
      sleep: mood.sleep,
    });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/moods/${editingMood._id}`, editData);

      alert("Mood updated successfully!");

      setEditingMood(null);

      fetchMoods();

    } catch (err) {
      console.log(err);

      alert("Unable to update mood.");
    }
  };

  
  return (
    <div className="mt-12">

      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-8">
        Your Mood History
      </h2>

      {entries.length === 0 ? (
        <p className="text-center text-gray-500">
          No mood entries yet.
        </p>
      ) : (
        <div className="overflow-x-auto">

          {/* <table className="w-full bg-white rounded-xl shadow-lg">

            <thead className="bg-emerald-600 text-white">

              <tr>

                <th className="p-4">Date</th>

                <th className="p-4">Mood</th>

                <th className="p-4">Stress</th>

                <th className="p-4">Sleep</th>

              </tr>

            </thead>

            <tbody>

              {moods.map((item) => (

                <tr
                  key={item._id}
                  className="border-b text-center hover:bg-gray-50"
                >

                  <td className="p-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {item.mood}
                  </td>

                  <td className="p-4">
                    {item.stress}/10
                  </td>

                  <td className="p-4">
                    {item.sleep} hrs
                  </td>

                </tr>

              ))}

            </tbody>

          </table> */}
          <div className="grid md:grid-cols-3 gap-6">

            {entries.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >

                <h3 className="text-2xl font-bold text-emerald-700">

                  {item.mood === "Happy" && "😊 Happy"}

                  {item.mood === "Calm" && "😌 Calm"}

                  {item.mood === "Neutral" && "😐 Neutral"}

                  {item.mood === "Sad" && "😢 Sad"}

                  {item.mood === "Anxious" && "😟 Anxious"}

                  {item.mood === "Stressed" && "😣 Stressed"}

                </h3>

                <div className="mt-5 space-y-3">

                  <p>

                    <span className="font-semibold">
                      Stress :
                    </span>

                    {" "}
                    {item.stress}/10

                  </p>

                  <p>

                    <span className="font-semibold">
                      Sleep :
                    </span>

                    {" "}
                    {item.sleep} hrs

                  </p>

                  <p className="text-sm text-gray-500">

                    {new Date(item.createdAt).toLocaleString()}

                  </p>
                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>
      )}
      {editingMood && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl p-8 w-[400px]">

            <h2 className="text-2xl font-bold mb-6">
              Edit Mood
            </h2>

            <label>Mood</label>

            <select
              className="w-full border p-2 rounded mt-2 mb-4"
              value={editData.mood}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  mood: e.target.value
                })
              }
            >

              <option>Happy</option>

              <option>Calm</option>

              <option>Neutral</option>

              <option>Sad</option>

              <option>Anxious</option>

              <option>Stressed</option>

            </select>

            <label>
              Stress
            </label>

            <input
              type="range"
              min="1"
              max="10"
              className="w-full"
              value={editData.stress}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  stress: Number(e.target.value)
                })
              }
            />

            <label>
              Sleep
            </label>

            <input
              type="number"
              className="w-full border p-2 rounded mt-2"
              value={editData.sleep}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  sleep: Number(e.target.value)
                })
              }
            />

            <div className="flex gap-3 mt-8">

              <button
                onClick={handleUpdate}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setEditingMood(null)}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}
    </div>
  );
}

export default MoodHistory;