import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

function Awareness() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const cardsRef = useRef([]);

  const headingRef = useRef(null);

  useEffect(() => {

    gsap.from(headingRef.current, {
      opacity: 0,
      y: 35,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.from(cardsRef.current, {
  opacity: 0,
  scale: 0.96,
  duration: 0.6,
  stagger: 0.1,
  ease: "power3.out",
  clearProps: "all",
});

  }, []);



  const topics = [
    {
      title: "Anxiety",

      intro:
        "Feeling worried or fearful more often than usual.",

      description:
        "Anxiety is more than occasional worry. It affects how we think, feel and behave. It may interfere with studies, work, relationships and daily life. Fortunately, anxiety is treatable with proper support, counselling and healthy coping strategies.",

      symptoms: [
        "Constant worrying",
        "Difficulty concentrating",
        "Fast heartbeat",
        "Restlessness",
        "Trouble sleeping",
      ],

      warning: [
        "Frequent panic attacks",
        "Avoiding social situations",
        "Fear without clear reason",
        "Unable to focus on studies",
      ],

      action: [
        "Practice deep breathing",
        "Reduce caffeine",
        "Exercise regularly",
        "Talk to someone you trust",
        "Seek professional help if needed",
      ],

      myths: [
        {
          myth: "Anxiety is just overthinking.",
          fact: "Anxiety is a genuine mental health condition that deserves treatment.",
        },
        {
          myth: "People should simply calm down.",
          fact: "Recovery often requires coping strategies, counselling or medical support.",
        },
      ],
    },

    {
      title: "Depression",

      intro:
        "Persistent sadness and loss of interest.",

      description:
        "Depression affects emotions, thoughts, motivation and physical health. It is not simply feeling sad. Depression is treatable and recovery is possible with early support.",

      symptoms: [
        "Low energy",
        "Loss of interest",
        "Poor concentration",
        "Feeling hopeless",
        "Changes in appetite",
      ],

      warning: [
        "Thoughts of self-harm",
        "Sleeping too much or too little",
        "Unable to complete daily activities",
        "Persistent sadness",
      ],

      action: [
        "Maintain a healthy routine",
        "Stay connected with loved ones",
        "Exercise regularly",
        "Seek counselling",
      ],

      myths: [
        {
          myth: "Depression is laziness.",
          fact: "Depression is a medical condition affecting the brain and body.",
        },
        {
          myth: "Only adults experience depression.",
          fact: "Children, teenagers and adults can all experience depression.",
        },
      ],
    },

    {
      title: "Stress",

      intro:
        "Pressure from studies, work or life.",

      description:
        "Stress is a normal response to challenges. However, prolonged stress affects physical and mental wellbeing, decreasing productivity and increasing the risk of burnout.",

      symptoms: [
        "Headaches",
        "Muscle tension",
        "Poor sleep",
        "Irritability",
        "Difficulty focusing",
      ],

      warning: [
        "Constant exhaustion",
        "Frequent anger",
        "Feeling overwhelmed",
        "Burnout symptoms",
      ],

      action: [
        "Take short breaks",
        "Exercise daily",
        "Practice breathing exercises",
        "Prioritize important tasks",
      ],

      myths: [
        {
          myth: "Stress always improves performance.",
          fact: "Excessive stress reduces learning, productivity and wellbeing.",
        },
      ],
    },

    {
      title: "Burnout",

      intro:
        "Mental and physical exhaustion caused by prolonged stress.",

      description:
        "Burnout develops after experiencing long periods of pressure without sufficient recovery. It affects motivation, productivity and emotional wellbeing.",

      symptoms: [
        "Extreme tiredness",
        "Feeling detached",
        "Reduced motivation",
        "Poor productivity",
      ],

      warning: [
        "Constant fatigue",
        "Loss of enthusiasm",
        "Emotional numbness",
        "Negative attitude",
      ],

      action: [
        "Take proper rest",
        "Reduce workload",
        "Set healthy boundaries",
        "Talk with a mentor",
      ],

      myths: [
        {
          myth: "Burnout is simply being tired.",
          fact: "Burnout is long-term emotional and physical exhaustion.",
        },
      ],
    },

    {
      title: "Loneliness",

      intro:
        "Feeling disconnected from others.",

      description:
        "Loneliness affects emotional wellbeing and may occur even when surrounded by people. Building healthy social connections improves resilience and happiness.",

      symptoms: [
        "Feeling isolated",
        "Low confidence",
        "Sadness",
        "Low motivation",
      ],

      warning: [
        "Avoiding social interaction",
        "Feeling unwanted",
        "Persistent sadness",
      ],

      action: [
        "Reach out to friends",
        "Join communities",
        "Volunteer",
        "Talk openly",
      ],

      myths: [
        {
          myth: "Loneliness only affects older adults.",
          fact: "Anyone can experience loneliness regardless of age.",
        },
      ],
    },

    {
      title: "When to Seek Help",

      intro:
        "Knowing when professional support is needed.",

      description:
        "Seeking professional help early improves recovery and prevents mental health problems from worsening.",

      symptoms: [
        "Persistent sadness",
        "Severe anxiety",
        "Unable to function normally",
        "Thoughts of self-harm",
      ],

      warning: [
        "Suicidal thoughts",
        "Self-harm",
        "Extreme emotional distress",
        "Loss of touch with reality",
      ],

      action: [
        "Speak with a psychologist",
        "Visit a counsellor",
        "Inform a trusted adult",
        "Call emergency services during crisis",
      ],

      myths: [
        {
          myth: "Seeking therapy means you are weak.",
          fact: "Seeking help is a sign of courage and strength.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#16241D] pt-32 pb-24">

      <div className="max-w-7xl mx-auto px-6">

        <div ref={headingRef} className="text-center max-w-4xl mx-auto">

          <h1 className="text-5xl font-bold text-emerald-700 dark:text-green-300">
            Mental Health Awareness
          </h1>

          <p className="text-center mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-8">
            Understanding mental health helps us recognize emotional struggles,
            support one another, reduce stigma, and know when professional help
            is needed. Explore the topics below to learn more.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {topics.map((topic, index) => (

            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => setSelectedTopic(topic)}
className="
bg-white
dark:bg-[#24372E]
rounded-3xl
shadow-lg
p-8
cursor-pointer
transition-all
duration-500
ease-out
hover:-translate-y-1
hover:shadow-2xl
"            >

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold text-emerald-700 dark:text-green-300">
                  {topic.title}
                </h2>

                {/* <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-[#355347] flex items-center justify-center text-2xl">
                  
                </div> */}

              </div>

              <p className="mt-6 text-gray-600 dark:text-gray-300 leading-7">
                {topic.intro}
              </p>

              <button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover;scale-105">
                Learn More
              </button>

            </div>
          ))}

        </div>
        {/* ================= SELF CARE ================= */}

        <section className="mt-24">

          <div className="bg-white dark:bg-[#24372E] rounded-3xl shadow-xl p-10">

            <h2 className="text-4xl font-bold text-center text-emerald-700 dark:text-green-300">
              Daily Self-Care Checklist
            </h2>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Small healthy habits practiced consistently can improve emotional
              wellbeing and resilience.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              {[
                "Sleep 7–9 hours",
                "Drink enough water",
                "Exercise for 20 minutes",
                "Practice deep breathing",
                "Talk to someone you trust",
                "Spend time outdoors",
                "Take breaks from screens",
                "Practice gratitude",
              ].map((item, index) => (

                <label
                  key={index}
                  className="flex items-center gap-4 bg-emerald-50 dark:bg-[#30453A] rounded-2xl p-5 cursor-pointer hover:shadow-md transition"
                >

                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-emerald-600"
                  />

                  <span className="text-lg text-gray-700 dark:text-gray-200">
                    {item}
                  </span>

                </label>

              ))}

            </div>

          </div>

        </section>

        {/* ================= PARENT AWARENESS ================= */}

        <section className="mt-24">

          <div className="bg-emerald-50 dark:bg-[#24372E] rounded-3xl shadow-xl p-10">

            <h2 className="text-4xl font-bold text-center text-emerald-700 dark:text-green-300">
              Parent Awareness
            </h2>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Parents play an important role in creating a safe environment
              where children feel comfortable expressing their emotions.
            </p>

            <div className="grid md:grid-cols-2 gap-10 mt-12">

              <div>

                <h3 className="text-2xl font-semibold text-emerald-700 dark:text-green-300 mb-6">
                  Parents can support children by
                </h3>

                <ul className="space-y-5 text-gray-700 dark:text-gray-300">

                  <li>✔ Listening without judgement.</li>

                  <li>✔ Encouraging open conversations.</li>

                  <li>✔ Appreciating effort instead of comparing.</li>

                  <li>✔ Watching for behavioural changes.</li>

                  <li>✔ Seeking professional help when needed.</li>

                </ul>

              </div>

              <div>

                <div className="bg-red-50 dark:bg-[#3B2A2A] rounded-2xl p-6">

                  <h3 className="text-2xl font-semibold text-red-600 mb-5">
                    Avoid Saying
                  </h3>

                  <ul className="space-y-4">

                    <li>❌ "It's all in your head."</li>

                    <li>❌ "Just be strong."</li>

                    <li>❌ "Others have bigger problems."</li>

                    <li>❌ "Stop crying."</li>

                  </ul>

                </div>

                <div className="bg-green-50 dark:bg-[#30453A] rounded-2xl p-6 mt-6">

                  <h3 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-5">
                    Instead Say
                  </h3>

                  <ul className="space-y-4">

                    <li>✅ "I'm here for you."</li>

                    <li>✅ "Thank you for telling me."</li>

                    <li>✅ "How can I help?"</li>

                    <li>✅ "Let's get help together."</li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </section>
        {/* ================= EMERGENCY HELP ================= */}
        {/* 
        <section className="mt-24">

          <div className="bg-red-50 dark:bg-[#2E2323] border-l-8 border-red-500 rounded-3xl shadow-xl p-10">

            <h2 className="text-4xl font-bold text-red-700 dark:text-red-400">
              Emergency Help
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-700 dark:text-gray-300">
              If someone is experiencing thoughts of self-harm, suicide,
              severe panic attacks, or is unable to stay safe, seek immediate
              professional help. Mental health emergencies deserve the same
              attention as physical emergencies.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-10">

              <div className="bg-white dark:bg-[#24372E] rounded-2xl shadow-md p-7">

                <div className="text-4xl mb-4">
                  👨‍👩‍👧
                </div>

                <h3 className="text-2xl font-semibold text-emerald-700 dark:text-green-300">
                  Trusted Adult
                </h3>

                <p className="mt-4 leading-7 text-gray-700 dark:text-gray-300">
                  Speak with your parents, guardians, teachers, mentors or a
                  close friend. Sharing your feelings is the first step towards
                  getting support.
                </p>

              </div>

              <div className="bg-white dark:bg-[#24372E] rounded-2xl shadow-md p-7">

                <div className="text-4xl mb-4">
                  🧠
                </div>

                <h3 className="text-2xl font-semibold text-emerald-700 dark:text-green-300">
                  Mental Health Professional
                </h3>

                <p className="mt-4 leading-7 text-gray-700 dark:text-gray-300">
                  Consult a psychologist, psychiatrist or licensed counsellor.
                  Professional guidance can help identify problems early and
                  provide appropriate treatment.
                </p>

              </div>

              <div className="bg-white dark:bg-[#24372E] rounded-2xl shadow-md p-7">

                <div className="text-4xl mb-4">
                  🚑
                </div>

                <h3 className="text-2xl font-semibold text-emerald-700 dark:text-green-300">
                  Emergency Services
                </h3>

                <p className="mt-4 leading-7 text-gray-700 dark:text-gray-300">
                  If there is immediate danger to yourself or someone else,
                  contact your local emergency services or visit the nearest
                  hospital immediately.
                </p>

              </div>

            </div>

          </div>

        </section> */}

        {/* ================= QUICK FACTS ================= */}

        <section className="mt-24">

          <div className="bg-white dark:bg-[#24372E] rounded-3xl shadow-xl p-10">

            <h2 className="text-4xl font-bold text-center text-emerald-700 dark:text-green-300">
              Mental Health Facts
            </h2>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understanding these facts helps reduce stigma and encourages
              people to seek help without fear.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

              <div className="bg-emerald-50 dark:bg-[#30453A] rounded-2xl p-7 text-center">

                <div className="text-5xl mb-4">
                  💚
                </div>

                <h3 className="text-2xl font-bold text-emerald-700 dark:text-green-300">
                  1 in 8
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  People globally live with a mental health condition.
                </p>

              </div>

              <div className="bg-emerald-50 dark:bg-[#30453A] rounded-2xl p-7 text-center">

                <div className="text-5xl mb-4">
                  🗣
                </div>

                <h3 className="text-2xl font-bold text-emerald-700 dark:text-green-300">
                  Talking Helps
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  Opening up early often prevents problems from becoming more
                  serious.
                </p>

              </div>

              <div className="bg-emerald-50 dark:bg-[#30453A] rounded-2xl p-7 text-center">

                <div className="text-5xl mb-4">
                  🧘
                </div>

                <h3 className="text-2xl font-bold text-emerald-700 dark:text-green-300">
                  Self Care
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  Sleep, exercise and healthy routines improve emotional
                  wellbeing.
                </p>

              </div>

              <div className="bg-emerald-50 dark:bg-[#30453A] rounded-2xl p-7 text-center">

                <div className="text-5xl mb-4">
                  🤝
                </div>

                <h3 className="text-2xl font-bold text-emerald-700 dark:text-green-300">
                  Recovery
                </h3>

                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  With timely support and treatment, recovery is possible for
                  most mental health conditions.
                </p>

              </div>

            </div>

          </div>

        </section>
        {/* ================= TOPIC MODAL ================= */}

        {selectedTopic && (

          <div
            className="
    fixed
    inset-0
    z-[100]
    bg-black/60
    backdrop-blur-sm
    overflow-y-auto
    pt-28
    pb-10
    px-5
  "
            onClick={() => setSelectedTopic(null)}
          >

            <div
              onClick={(e) => e.stopPropagation()}
              className="
    relative
    max-w-5xl
    w-full
    mx-auto
    bg-white
    dark:bg-[#24372E]
    rounded-3xl
    shadow-2xl
    p-10
    md:p-12
    mb-10
  "
            >

              {/* Close Button */}

              <button
                onClick={() => setSelectedTopic(null)}
                className="
                absolute
                top-6
                right-6
                w-12
                h-12
                rounded-full
                bg-red-50
                hover:bg-red-100
                dark:bg-red-900/30
                dark:hover:bg-red-900/50
                text-red-600
                text-3xl
                transition
              "
              >
                ×
              </button>

              {/* Heading */}

              <h2 className="text-4xl font-bold text-emerald-700 dark:text-green-300">
                {selectedTopic.title}
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
                {selectedTopic.description}
              </p>

              {/* Symptoms */}

              <div className="mt-10">

                <h3 className="text-2xl font-semibold text-emerald-700 dark:text-green-300">
                  Common Symptoms
                </h3>

                <ul className="mt-5 grid md:grid-cols-2 gap-4">

                  {selectedTopic.symptoms.map((item, index) => (

                    <li
                      key={index}
                      className="border-l-4 border-emerald-600 bg-emerald-50 dark:bg-[#30453A] rounded-xl px-5 py-4"
                    >
                      ✓ {item}
                    </li>

                  ))}

                </ul>

              </div>

              {/* Warning Signs */}

              <div className="mt-12">

                <h3 className="text-2xl font-semibold text-red-600">
                  Warning Signs
                </h3>

                <ul className="mt-5 grid md:grid-cols-2 gap-4">

                  {selectedTopic.warning.map((item, index) => (

                    <li
                      key={index}
                      className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl px-5 py-4"
                    >
                      ⚠ {item}
                    </li>

                  ))}

                </ul>

              </div>

              {/* What You Can Do */}

              <div className="mt-12">

                <h3 className="text-2xl font-semibold text-emerald-700 dark:text-green-300">
                  What You Can Do
                </h3>

                <ul className="mt-5 space-y-4">

                  {selectedTopic.action.map((item, index) => (

                    <li
                      key={index}
                      className="bg-gray-50 dark:bg-[#30453A] rounded-xl px-5 py-4"
                    >
                      🌱 {item}
                    </li>

                  ))}

                </ul>

              </div>

              {/* Myths vs Facts */}

              <div className="mt-14">

                <h3 className="text-2xl font-semibold text-emerald-700 dark:text-green-300">
                  Myths vs Facts
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mt-6">

                  {selectedTopic.myths.map((item, index) => (

                    <div
                      key={index}
                      className="rounded-2xl bg-emerald-50 dark:bg-[#30453A] p-6 shadow"
                    >

                      <h4 className="text-red-600 font-bold text-lg">
                        Myth
                      </h4>

                      <p className="mt-2 leading-7 text-gray-700 dark:text-gray-300">
                        {item.myth}
                      </p>

                      <hr className="my-5 border-gray-300 dark:border-gray-600" />

                      <h4 className="text-emerald-700 dark:text-green-300 font-bold text-lg">
                        Fact
                      </h4>

                      <p className="mt-2 leading-7 text-gray-700 dark:text-gray-300">
                        {item.fact}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>
  );

}

export default Awareness;