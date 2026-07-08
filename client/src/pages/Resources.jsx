import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ResourceMap from "../components/ResourceMap";

function Resources() {

  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {

    gsap.from(headingRef.current, {
      opacity: 0,
      y: 40,
      duration: 1
    });

    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.3
    });

  }, []);

  return (

    <div className="min-h-screen bg-stone-50 dark:bg-[#16241D] pt-32">

      <div className="max-w-7xl mx-auto px-6">

        <div ref={headingRef}>

          <h1 className="text-5xl font-bold text-center text-emerald-700 dark:text-green-300">
            Mental Health Resources
          </h1>

          <p className="text-center mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Seeking support is a sign of strength. Explore self-help
            techniques, professional resources and emergency guidance.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-14">

          {/* Self Care */}

          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="bg-white dark:bg-[#24372E] rounded-3xl shadow-lg p-8"
          >

            <h2 className="text-2xl font-bold text-emerald-700 dark:text-green-300">
              Daily Self-Care
            </h2>

            <ul className="mt-5 space-y-3 list-disc ml-5">

              <li>Sleep 7–9 hours consistently.</li>
              <li>Drink enough water.</li>
              <li>Exercise for at least 20 minutes.</li>
              <li>Spend time outdoors.</li>
              <li>Practice deep breathing.</li>
              <li>Talk with trusted people.</li>

            </ul>

          </div>

          {/* Professional Help */}

          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="bg-white dark:bg-[#24372E] rounded-3xl shadow-lg p-8"
          >

            <h2 className="text-2xl font-bold text-emerald-700 dark:text-green-300">
              Professional Support
            </h2>

            <ul className="mt-5 space-y-3 list-disc ml-5">

              <li>Licensed Psychologist</li>
              <li>Psychiatrist</li>
              <li>Counsellor</li>
              <li>Hospital Mental Health Unit</li>
              <li>University Counselling Centre</li>

            </ul>

          </div>

          {/* Emergency */}

          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="bg-red-50 dark:bg-red-900 rounded-3xl shadow-lg p-8"
          >

            <h2 className="text-2xl font-bold text-red-700 dark:text-red-200">
              Emergency
            </h2>

            <p className="mt-5 leading-8">

              If you or someone around you is at immediate risk of
              self-harm or suicide, contact your local emergency
              services immediately or go to the nearest hospital.

            </p>

          </div>

        </div>

        {/* Map */}

        <div className="mt-16">

          <ResourceMap />
          {/* <div className="bg-white p-10 rounded-xl shadow">
            Map will be added here.
          </div> */}

        </div>

      </div>

    </div>

  );

}

export default Resources;