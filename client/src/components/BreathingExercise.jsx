import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function BreathingExercise() {
  const circleRef = useRef(null);
  const [text, setText] = useState("Breathe In");

  useEffect(() => {
    const animation = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        setText("Breathe In");
      }
    });

    animation
      .to(circleRef.current, {
        scale: 1.4,
        duration: 4,
        ease: "power1.inOut",
        onStart: () => setText("Breathe In")
      })
      .to(circleRef.current, {
        scale: 1,
        duration: 4,
        ease: "power1.inOut",
        onStart: () => setText("Breathe Out")
      });

    return () => animation.kill();
  }, []);

  return (
    <div className="bg-white dark:bg-[#23372E] rounded-3xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold text-emerald-700 dark:text-green-300 text-center">
        Breathing Exercise
      </h2>

      <p className="text-center mt-3 text-gray-600 dark:text-gray-300">
        Follow the circle. Inhale as it expands and exhale as it contracts.
      </p>

      <div className="flex justify-center items-center h-72">

        <div
          ref={circleRef}
          className="
            w-40
            h-40
            rounded-full
            bg-emerald-500
            text-white
            flex
            items-center
            justify-center
            text-xl
            font-bold
            shadow-xl
          "
        >
          {text}
        </div>

      </div>

    </div>
  );
}

export default BreathingExercise;