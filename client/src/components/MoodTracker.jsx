import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import Suggestions from "./Suggestions";
import BreathingExercise from "./BreathingExercise";
import WalkingExercise from "./WalkingExercise";
import HydrationExercise from "./HydrationExercise";
import StretchExercise from "./StretchExercise";
import PlantGrowth from "./PlantGrowth";
import api from "../api/api";
import MoodHistory from "./MoodHistory";
import MoodChart from "./MoodChart";



function MoodTracker() {

  const cardRef = useRef(null);

  const [mood, setMood] = useState("");
  const [stress, setStress] = useState(5);
  const [sleep, setSleep] = useState(8);

  const [entries, setEntries] = useState([]);
  
  const [saved, setSaved] = useState(false);

  const [recommendedExercises, setRecommendedExercises] = useState([]);

  const [selectedExercise, setSelectedExercise] = useState("");

  useEffect(() => {

    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

  }, []);
  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await api.get("/moods");
      setEntries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    if (!mood) {
      alert("Please select your mood.");
      return;
    }

    try {
      const res = await api.post("/moods", {
        mood,
        stress: Number(stress),
        sleep: Number(sleep),
      });

      console.log(res.data);

      alert("Mood Saved Successfully!");
      fetchMoods();

      let exercises = [];

      switch (mood) {
        case "Happy":
          exercises = ["Walking", "Hydration", "Plant Growth"];
          break;

        case "Calm":
          exercises = ["Walking", "Stretch", "Hydration"];
          break;

        case "Neutral":
          exercises = ["Walking", "Hydration", "Breathing"];
          break;

        case "Sad":
          exercises = ["Breathing", "Plant Growth", "Walking"];
          break;

        case "Anxious":
          exercises = ["Breathing", "Stretch", "Walking"];
          break;

        case "Stressed":
          exercises = ["Breathing", "Stretch", "Hydration"];
          break;

        default:
          exercises = ["Breathing"];
      }

      setRecommendedExercises(exercises);
      setSaved(true);

    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Could not save mood.");
    }
  };

  return (

    <div
      ref={cardRef}
      className="max-w-5xl mx-auto bg-white dark:bg-[#24372E] rounded-3xl shadow-xl p-8 mt-10"
    >

      <h2 className="text-3xl font-bold text-center text-emerald-700 dark:text-green-300 mb-8 ">
        Mood Tracker
      </h2>

      <div className="space-y-6">

        <div>

          <label className="font-semibold">
            Current Mood
          </label>

          <select
            className="w-full mt-2 p-3 rounded-xl border"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >

            <option value="">Select Mood</option>

            <option value="Happy">Happy</option>

            <option value="Calm">Calm</option>

            <option value="Neutral">Neutral</option>

            <option value="Anxious">Anxious</option>

            <option value="Sad">Sad</option>

            <option value="Stressed">Stressed</option>

          </select>

        </div>

        <div>

          <label className="font-semibold">
            Stress Level : {stress}/10
          </label>

          <input
            className="w-full mt-2"
            type="range"
            min="1"
            max="10"
            value={stress}
            onChange={(e) => setStress(Number(e.target.value))}
          />

        </div>

        <div>

          <label className="font-semibold">
            Hours Slept
          </label>

          <input
            className="w-full mt-2 p-3 rounded-xl border"
            type="number"
            min="0"
            max="24"
            value={sleep}
            onChange={(e) => setSleep(Number(e.target.value))}
          />

        </div>

        <button
          onClick={handleSave}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold"
        >
          Save Mood
        </button>

      </div>

      {saved && (

        <>

          <div className="mt-8 bg-green-100 text-green-700 rounded-xl p-4 text-center">

            Mood saved successfully.

          </div>

          <Suggestions

            mood={mood}

            stress={stress}

            sleep={sleep}

          />

          <div className="mt-10">

            <h2 className="text-2xl font-bold text-center mb-6">

              Recommended Activities

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {recommendedExercises.map((exercise) => (

                <div

                  key={exercise}

                  onClick={() => setSelectedExercise(exercise)}

                  className="cursor-pointer bg-emerald-50 dark:bg-[#30453A] rounded-2xl shadow-lg p-6 hover:scale-105 transition"

                >

                  <h3 className="text-xl font-semibold text-center">

                    {exercise === "Breathing" && "🌬 Breathing"}

                    {exercise === "Walking" && "🚶 Walking"}

                    {exercise === "Hydration" && "💧 Hydration"}

                    {exercise === "Stretch" && "🤸 Stretch"}

                    {exercise === "Plant Growth" && "🌱 Plant Growth"}

                  </h3>

                  <p className="text-center mt-4">

                    Click to begin

                  </p>

                </div>

              ))}

            </div>

          </div>

          <div className="mt-10">

            {selectedExercise === "Breathing" && <BreathingExercise />}

            {selectedExercise === "Walking" && <WalkingExercise />}

            {selectedExercise === "Hydration" && <HydrationExercise />}

            {selectedExercise === "Stretch" && <StretchExercise />}

            {selectedExercise === "Plant Growth" && <PlantGrowth />}

          </div>

        </>

      )}
      <MoodHistory
      entries={entries}
      fetchMoods={fetchMoods}
      />
      {/* <MoodChart moods={moods}/> */}
      <MoodChart moods={entries}/>

    </div>

  );

}

export default MoodTracker;