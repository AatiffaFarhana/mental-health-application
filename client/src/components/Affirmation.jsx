import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const quotes = [
  "You are stronger than you think.",
  "Healing is not linear, and that's okay.",
  "Every day is a fresh start.",
  "You deserve kindness, especially from yourself.",
  "Small steps every day lead to big changes.",
  "It is okay to ask for help.",
  "Your feelings are valid.",
  "Progress matters more than perfection.",
  "Take one breath at a time.",
  "Rest is productive too.",
  "You are not alone in this journey.",
  "Difficult moments do not define you.",
  "Hope grows one day at a time.",
  "Your mental health matters.",
  "Be proud of how far you've come.",
  "Choose peace over pressure.",
  "You deserve happiness.",
  "Celebrate every small victory.",
  "Be gentle with yourself today.",
  "Tomorrow is another opportunity to grow."
];

function Affirmation() {
  const cardRef = useRef(null);

  const [quote, setQuote] = useState("");

  useEffect(() => {
    newQuote();
  }, []);

  const newQuote = () => {
    const random =
      quotes[Math.floor(Math.random() * quotes.length)];

    setQuote(random);

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }
    );
  };

  return (
    <div
      ref={cardRef}
      className="bg-emerald-50 rounded-3xl shadow-xl p-8 text-center my-10"
    >
      <h2 className="text-3xl font-bold text-emerald-700 mb-6">
        🌿 Daily Affirmation
      </h2>

      <p className="text-xl italic text-gray-700 leading-8">
        "{quote}"
      </p>

      <button
        onClick={newQuote}
        className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl transition"
      >
        New Quote
      </button>
    </div>
  );
}

export default Affirmation;