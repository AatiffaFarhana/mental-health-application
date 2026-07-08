import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function PlantGrowth() {
  const stemRef = useRef(null);
  const leftLeafRef = useRef(null);
  const rightLeafRef = useRef(null);
  const flowerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    });

    tl.set([stemRef.current, leftLeafRef.current, rightLeafRef.current, flowerRef.current], {
      scale: 0,
      opacity: 0,
    });

    tl.to(stemRef.current, {
      scaleY: 1,
      opacity: 1,
      duration: 1.5,
      transformOrigin: "bottom center",
    })

      .to(
        leftLeafRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
        },
        "-=0.4"
      )

      .to(
        rightLeafRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
        },
        "-=0.3"
      )

      .to(
        flowerRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
        },
        "-=0.2"
      );
  }, []);

  return (
    <div className="bg-white dark:bg-[#23372E] rounded-3xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold text-center text-emerald-700 dark:text-green-300">
        Grow With Every Small Step
      </h2>

      <p className="text-center mt-3 text-gray-600 dark:text-gray-300">
        Healing takes time. Every healthy habit helps you grow stronger.
      </p>

      <div className="flex justify-center mt-10">

        <div className="relative w-40 h-64">

          {/* Soil */}
          <div className="absolute bottom-0 w-full h-8 bg-amber-700 rounded-full"></div>

          {/* Stem */}
          <div
            ref={stemRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-2 h-28 bg-green-600 rounded-full"
          ></div>

          {/* Left Leaf */}
          <div
            ref={leftLeafRef}
            className="absolute bottom-28 left-12 w-8 h-4 bg-green-500 rounded-full rotate-[-35deg]"
          ></div>

          {/* Right Leaf */}
          <div
            ref={rightLeafRef}
            className="absolute bottom-36 right-12 w-8 h-4 bg-green-500 rounded-full rotate-[35deg]"
          ></div>

          {/* Flower */}
          <div
            ref={flowerRef}
            className="absolute bottom-36 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-pink-400 border-4 border-pink-300"
          ></div>

        </div>

      </div>

      <p className="text-center italic mt-8 text-emerald-700 dark:text-green-300">
        "Small acts of self-care today become strength tomorrow."
      </p>

    </div>
  );
}

export default PlantGrowth;