import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function WalkingExercise() {
  const personRef = useRef(null);
  const leftLegRef = useRef(null);
  const rightLegRef = useRef(null);

  useEffect(() => {
    // Move the person left to right
    gsap.to(personRef.current, {
      x: 250,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "linear",
    });

    // Swing left leg
    gsap.to(leftLegRef.current, {
      rotation: 25,
      transformOrigin: "top center",
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Swing right leg
    gsap.to(rightLegRef.current, {
      rotation: -25,
      transformOrigin: "top center",
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

  }, []);

  return (
    <div className="bg-white dark:bg-[#23372E] rounded-3xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold text-center text-emerald-700 dark:text-green-300">
        Take a Short Walk
      </h2>

      <p className="text-center mt-3 text-gray-600 dark:text-gray-300">
        Even a 10-minute walk can reduce stress and improve your mood.
      </p>

      <div className="relative h-56 mt-8 overflow-hidden">

        <div
          ref={personRef}
          className="absolute left-0 bottom-10 flex flex-col items-center"
        >

          {/* Head */}
          <div className="w-8 h-8 rounded-full bg-emerald-600"></div>

          {/* Body */}
          <div className="w-1 h-16 bg-emerald-600"></div>

          {/* Legs */}
          <div className="flex gap-4">

            <div
              ref={leftLegRef}
              className="w-1 h-12 bg-emerald-600"
            ></div>

            <div
              ref={rightLegRef}
              className="w-1 h-12 bg-emerald-600"
            ></div>

          </div>

        </div>

        {/* Ground */}
        <div className="absolute bottom-8 w-full border-t-4 border-emerald-400"></div>

      </div>

    </div>
  );
}

export default WalkingExercise;