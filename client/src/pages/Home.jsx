import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";
import Affirmation from "../components/Affirmation";
function Home() {
  //const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
  const tl = gsap.timeline();

  tl.from(titleRef.current, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  })
    .from(
      textRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
      },
      "-=0.5"
    )
    // .from(
    //   buttonRef.current.children,
    //   {
    //     opacity: 0,
    //     y: 20,
    //     stagger: 0.2,
    //     duration: 0.6,
    //   },
    //   "-=0.3"
    // );
    
}, []);
  return (
    <div className="bg-stone-50 dark:bg-[#16241D] text-gray-800 dark:text-white">

      <section className="relative h-screen flex items-center justify-center overflow-hidden">

  {/* Hero Image */}
  <img
    //ref={heroRef}
    src={heroImage}
    alt="Peaceful meadow representing hope and mental wellness"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/45"></div>

  {/* Hero Content */}
  <div className="relative z-10 max-w-4xl text-center px-6">

    <h1
      ref={titleRef}
      className="text-5xl md:text-7xl font-bold text-white"
    >
      It's Okay To Not Be Okay
    </h1>

    <p
      ref={textRef}
      className="mt-6 text-lg md:text-2xl text-gray-200 leading-8"
    >
      Your feelings matter. This is a safe place to understand your emotions,
      practise self-care, and discover support whenever you need it.
    </p>

    <div
      ref={buttonRef}
      className="mt-10 flex flex-wrap justify-center gap-5"
    >
      <Link
        to="/mood-tracker"
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl transition"
      >
        Track My Mood
      </Link>

      <Link
        to="/resources"
        className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-4 rounded-xl transition"
      >
        Find Support
      </Link>
    </div>

  </div>

</section>

      {/* Affirmation */}

      <section className="max-w-6xl mx-auto py-20 px-6">

        {/* <div className="bg-white dark:bg-[#24372E] rounded-3xl shadow-lg p-10">

          <h2 className="text-3xl font-bold text-emerald-700 dark:text-green-300">
            Today's Positive Affirmation
          </h2>

          <p className="mt-6 text-lg leading-8"> */}
            {/* You have survived every difficult day that brought you here.
            Healing is not a race, and asking for help is one of the bravest
            things you can do. */}
            <Affirmation/>
          {/* </p>

        </div> */}

      </section>

      {/* Wellness Suggestions */}

      <section className="max-w-6xl mx-auto pb-20 px-6">

        <h2 className="text-4xl font-bold mb-10 text-center">
          Daily Wellness Suggestions
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white dark:bg-[#24372E] rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">
              Deep Breathing
            </h3>

            <p>
              Spend five minutes focusing on slow breathing to reduce stress
              and calm your thoughts.
            </p>
          </div>

          <div className="bg-white dark:bg-[#24372E] rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">
              Stay Hydrated
            </h3>

            <p>
              Drinking enough water improves concentration and supports both
              physical and mental well-being.
            </p>
          </div>

          <div className="bg-white dark:bg-[#24372E] rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">
              Take a Walk
            </h3>

            <p>
              A short walk outdoors can improve your mood and reduce feelings
              of anxiety.
            </p>
          </div>

        </div>

      </section>

      {/* Emergency */}

      <section className="bg-emerald-800 text-white py-16">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold">
            Need Immediate Help?
          </h2>

          <p className="mt-6 text-lg leading-8">
            If you are in immediate danger or having thoughts of harming
            yourself, contact your local emergency services or speak to a
            trusted family member, friend, or mental health professional
            immediately.
          </p>

          <Link
            to="/resources"
            className="inline-block mt-8 bg-white text-emerald-800 px-8 py-4 rounded-xl font-semibold"
          >
            View Support Resources
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;







