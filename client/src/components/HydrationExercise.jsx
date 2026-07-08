import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function HydrationExercise() {
  const waterRef = useRef(null);

  useEffect(() => {
    gsap.to(waterRef.current, {
      height: "100%",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="bg-white dark:bg-[#23372E] rounded-3xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold text-center text-emerald-700 dark:text-green-300">
        Stay Hydrated
      </h2>

      <p className="text-center mt-3 text-gray-600 dark:text-gray-300">
        Drinking enough water helps improve concentration, mood and overall health.
      </p>

      <div className="flex justify-center mt-8">

        <div className="relative w-24 h-52 border-4 border-emerald-600 rounded-xl overflow-hidden">

          <div
            ref={waterRef}
            className="absolute bottom-0 left-0 w-full bg-sky-400"
            style={{ height: "20%" }}
          ></div>

        </div>

      </div>

    </div>
  );
}

export default HydrationExercise;