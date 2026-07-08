import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function StretchExercise() {
  const leftArm = useRef(null);
  const rightArm = useRef(null);

  useEffect(() => {

    gsap.to(leftArm.current, {
      rotation: -45,
      transformOrigin: "top center",
      duration: 1,
      repeat: -1,
      yoyo: true,
    });

    gsap.to(rightArm.current, {
      rotation: 45,
      transformOrigin: "top center",
      duration: 1,
      repeat: -1,
      yoyo: true,
    });

  }, []);

  return (
    <div className="bg-white dark:bg-[#23372E] rounded-3xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold text-center text-emerald-700 dark:text-green-300">
        Gentle Stretch
      </h2>

      <p className="text-center mt-3 text-gray-600 dark:text-gray-300">
        Stretch your body for a minute to reduce muscle tension and refresh your mind.
      </p>

      <div className="flex justify-center mt-10">

        <div className="flex flex-col items-center">

          {/* Head */}
          <div className="w-10 h-10 rounded-full bg-emerald-600"></div>

          {/* Body */}
          <div className="relative w-2 h-24 bg-emerald-600">

            {/* Left Arm */}
            <div
              ref={leftArm}
              className="absolute top-3 -left-10 w-10 h-2 bg-emerald-600"
            ></div>

            {/* Right Arm */}
            <div
              ref={rightArm}
              className="absolute top-3 left-2 w-10 h-2 bg-emerald-600"
            ></div>

          </div>

          {/* Legs */}
          <div className="flex gap-6">

            <div className="w-2 h-16 bg-emerald-600"></div>

            <div className="w-2 h-16 bg-emerald-600"></div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StretchExercise;