// import { useState, useEffect, useRef } from "react";
// //import { gsap } from "gsap";

// function Awareness() {
//   //const cardsRef = useRef([]);
//   const [active, setActive] = useState(null);

//   const topics = [
//     {
//       title: "Anxiety",
//       intro: "Feeling worried or fearful more often than usual.",
//       description:
//         "Anxiety is more than occasional worry. It can make everyday situations feel overwhelming and interfere with studies, work and relationships.",
//       symptoms: [
//         "Constant worrying",
//         "Fast heartbeat",
//         "Sweating",
//         "Difficulty concentrating",
//         "Trouble sleeping"
//       ],
//       actions: [
//         "Practice slow breathing.",
//         "Reduce caffeine.",
//         "Take a short walk.",
//         "Talk to someone you trust.",
//         "Seek professional help if symptoms continue."
//       ]
//     },

//     {
//       title: "Depression",
//       intro: "Persistent sadness and loss of interest.",
//       description:
//         "Depression affects how a person thinks, feels and behaves. It is treatable with proper support.",
//       symptoms: [
//         "Feeling hopeless",
//         "Lack of energy",
//         "Poor concentration",
//         "Changes in appetite",
//         "Loss of interest"
//       ],
//       actions: [
//         "Maintain a routine.",
//         "Stay connected with family.",
//         "Avoid isolation.",
//         "Seek counselling."
//       ]
//     },

//     {
//       title: "Stress",
//       intro: "Pressure from studies, work or life events.",
//       description:
//         "Stress becomes harmful when it lasts for a long time and begins affecting physical and mental health.",
//       symptoms: [
//         "Headaches",
//         "Muscle tension",
//         "Poor sleep",
//         "Irritability"
//       ],
//       actions: [
//         "Take regular breaks.",
//         "Exercise.",
//         "Practice breathing.",
//         "Prioritize important tasks."
//       ]
//     },

//     {
//       title: "Burnout",
//       intro: "Mental and physical exhaustion.",
//       description:
//         "Burnout develops after prolonged stress and overwork. It reduces motivation and productivity.",
//       symptoms: [
//         "Extreme tiredness",
//         "Reduced performance",
//         "Feeling detached",
//         "No motivation"
//       ],
//       actions: [
//         "Rest properly.",
//         "Set healthy boundaries.",
//         "Take leave if possible.",
//         "Talk to a mentor."
//       ]
//     },

//     {
//       title: "Loneliness",
//       intro: "Feeling disconnected from others.",
//       description:
//         "Loneliness can affect anyone. Healthy relationships improve emotional wellbeing.",
//       symptoms: [
//         "Feeling isolated",
//         "Sadness",
//         "Low confidence",
//         "Low motivation"
//       ],
//       actions: [
//         "Call a friend.",
//         "Join clubs.",
//         "Volunteer.",
//         "Talk openly."
//       ]
//     },

//     {
//       title: "When to Seek Help",
//       intro: "Know when professional support is needed.",
//       description:
//         "If emotional problems continue for weeks or affect daily life, consult a mental health professional.",
//       symptoms: [
//         "Persistent sadness",
//         "Self-harm thoughts",
//         "Severe anxiety",
//         "Unable to function normally"
//       ],
//       actions: [
//         "Visit a psychologist.",
//         "Speak with a trusted adult.",
//         "Contact emergency services if in danger."
//       ]
//     }
//   ];

//   // useEffect(() => {
//   //   gsap.from(cardsRef.current, {
//   //     opacity: 0,
//   //     y: 50,
//   //     duration: 0.8,
//   //     stagger: 0.12,
//   //     ease: "power3.out",
//   //   });
//   // }, []);

//   return (
//     <div className="min-h-screen bg-stone-50 dark:bg-[#16241D] pt-32 pb-20">

//       <div className="max-w-7xl mx-auto px-6">

//         <h1 className="text-center text-5xl font-bold text-emerald-700 dark:text-green-300">
//           Mental Health Awareness
//         </h1>

//         <p className="text-center mt-6 max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
//           Learning about mental health helps us understand ourselves and
//           support others with empathy. Click any topic below to learn more.
//         </p>

//         <div className="grid lg:grid-cols-2 gap-8 mt-14">

//           {topics.map((topic, index) => (

//             <div
//               key={index}
//               //ref={(el) => (cardsRef.current[index] = el)}
//               onClick={() =>
//                 setActive(active === index ? null : index)
//               }
//               className="bg-white dark:bg-[#24372E] rounded-3xl shadow-lg p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
//             >

//               <div className="flex justify-between items-center">

//                 <h2 className="text-3xl font-bold text-emerald-700 dark:text-green-300">
//                   {topic.title}
//                 </h2>

//                 <span className="text-4xl font-bold text-emerald-700">
//                   {active === index ? "−" : "+"}
//                 </span>

//               </div>

//               <p className="mt-5 text-lg text-gray-700 dark:text-gray-200">
//                 {topic.intro}
//               </p>

//               {active === index && (

//                 <div className="mt-8 border-t pt-6 animate-fade-in">

//                   <h3 className="text-xl font-semibold">
//                     What is it?
//                   </h3>

//                   <p className="mt-3 leading-8 text-gray-700 dark:text-gray-200">
//                     {topic.description}
//                   </p>

//                   <h3 className="mt-8 text-xl font-semibold">
//                     Common Symptoms
//                   </h3>

//                   <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700 dark:text-gray-200">

//                     {topic.symptoms.map((item, i) => (
//                       <li key={i}>{item}</li>
//                     ))}

//                   </ul>

//                   <h3 className="mt-8 text-xl font-semibold">
//                     What You Can Do
//                   </h3>

//                   <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700 dark:text-gray-200">

//                     {topic.actions.map((item, i) => (
//                       <li key={i}>{item}</li>
//                     ))}

//                   </ul>

//                 </div>

//               )}

//             </div>

//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Awareness;

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

function Awareness() {
  //const cardsRef = useRef([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    {
      title: "Anxiety",
      intro: "Feeling worried or fearful more often than usual.",
      description:
        "Anxiety is more than occasional worry. It can make everyday situations feel overwhelming and interfere with studies, work, or relationships.",
      symptoms: [
        "Constant worrying",
        "Fast heartbeat",
        // "Sweating",
        "Difficulty concentrating",
        "Trouble sleeping",
      ],
      action: [
        "Take slow deep breaths.",
        "Reduce caffeine.",
        "Go for a short walk.",
        "Talk to someone you trust , Seek professional help if needed.",
      ],
    },
    {
      title: "Depression",
      intro: "Persistent sadness and loss of interest.",
      description:
        "Depression affects emotions, thinking and daily life. It is treatable with the right support.",
      symptoms: [
        "Low energy , Feeling hopeless",
        "Poor concentration",
        "Loss of interest",
        "Changes in appetite",
      ],
      action: [
        "Maintain a routine.",
        "Stay connected with loved ones.",
        "Exercise regularly.",
        "Seek counselling.",
      ],
    },
    {
      title: "Stress",
      intro: "Pressure from studies, work or life.",
      description:
        "Stress is normal, but continuous stress can affect physical and mental health.",
      symptoms: [
        "Headaches",
        "Muscle tension",
        "Poor sleep",
        "Irritability",
      ],
      action: [
        "Take breaks.",
        "Exercise.",
        "Practice breathing.",
        "Prioritize tasks.",
      ],
    },
    {
      title: "Burnout",
      intro: "Mental and physical exhaustion.",
      description:
        "Burnout develops after prolonged stress and overwork.",
      symptoms: [
        "Extreme tiredness",
        "Reduced motivation",
        "Feeling detached",
        "Poor productivity",
      ],
      action: [
        "Rest well.",
        "Set boundaries.",
        "Take breaks.",
        "Talk to your mentor.",
      ],
    },
    {
      title: "Loneliness",
      intro: "Feeling disconnected from others.",
      description:
        "Loneliness can affect anyone and may impact emotional wellbeing.",
      symptoms: [
        "Feeling isolated",
        "Low confidence",
        "Sadness",
        "Low motivation",
      ],
      action: [
        "Reach out to friends.",
        "Join communities.",
        "Volunteer.",
        "Talk openly.",
      ],
    },
    {
      title: "When to Seek Help",
      intro: "Recognizing when professional support is needed.",
      description:
        "If emotional struggles continue for weeks or affect daily life, seek professional help.",
      symptoms: [
        "Persistent sadness",
        "Self-harm thoughts",
        "Unable to function",
        "Severe anxiety",
      ],
      action: [
        "Speak with a psychologist.",
        "Visit a counsellor.",
        "Inform a trusted adult.",
        "Call emergency services during crisis.",
      ],
    },
  ];

  // useEffect(() => {
  //   gsap.from(cardsRef.current, {
  //     opacity: 0,
  //     y: 40,
  //     stagger: 0.15,
  //     duration: 0.8,
  //     ease: "power3.out",
  //   });
  // }, []);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#16241D] pt-32 pb-20">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center text-emerald-700 dark:text-green-300">
          Mental Health Awareness
        </h1>

        <p className="text-center mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Learning about mental health helps us understand ourselves and support
          others. Click any topic below to learn more.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

          {topics.map((topic, index) => (

            <div
              key={index}
              //ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => setSelectedTopic(topic)}
              className="cursor-pointer bg-white dark:bg-[#24372E] rounded-3xl shadow-lg p-8 transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-emerald-700 dark:text-green-300 ">
                {topic.title}
              </h2>

              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {topic.intro}
              </p>

              <p className="mt-6 text-emerald-600 font-semibold">
                Click to learn more →
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Modal */}

      {selectedTopic && (

        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedTopic(null)}
        >

          <div
            className="bg-white dark:bg-[#24372E] rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setSelectedTopic(null)}
              className="absolute top-5 right-6 text-3xl font-bold hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-4xl font-bold text-emerald-700 dark:text-green-300">
              {selectedTopic.title}
            </h2>

            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              {selectedTopic.description}
            </p>

            <h3 className="mt-8 text-2xl font-semibold">
              Common Symptoms
            </h3>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              {selectedTopic.symptoms.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="mt-8 text-2xl font-semibold">
              What You Can Do
            </h3>

            <ul className="list-disc ml-6 mt-4 space-y-2">
              {selectedTopic.action.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

          </div>

        </div>

      )}

    </div>
  );
}

export default Awareness;