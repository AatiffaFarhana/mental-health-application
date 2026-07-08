function Suggestions({ mood, stress, sleep }) {
  const suggestions = [];

  // Mood suggestions
  switch (mood) {
    case "Happy":
      suggestions.push({
        title: "Keep the Positive Energy",
        text: "Continue doing the activities that made today enjoyable. Sharing your happiness with others can also improve their day."
      });
      break;

    case "Calm":
      suggestions.push({
        title: "Maintain Your Balance",
        text: "You're in a peaceful state. Continue your healthy routine and take short breaks throughout the day."
      });
      break;

    case "Neutral":
      suggestions.push({
        title: "Boost Your Mood",
        text: "Try listening to your favourite music, taking a short walk, or speaking with someone you enjoy spending time with."
      });
      break;

    case "Stressed":
      suggestions.push({
        title: "Reduce Stress",
        text: "Pause for a few minutes. Try slow breathing, stretching, and reducing screen time for a while."
      });
      break;

    case "Sad":
      suggestions.push({
        title: "Be Kind to Yourself",
        text: "Your feelings are valid. Talk to someone you trust, rest if needed, and remember that seeking professional help is a sign of strength."
      });
      break;

    default:
      break;
  }

  // Stress suggestions
  if (stress >= 8) {
    suggestions.push({
      title: "High Stress Detected",
      text: "Take a 10-minute break, drink water, practise deep breathing, and avoid making important decisions while overwhelmed."
    });
  } else if (stress >= 5) {
    suggestions.push({
      title: "Moderate Stress",
      text: "Consider going for a short walk, stretching, or listening to calming music."
    });
  }

  // Sleep suggestions
  if (sleep < 6) {
    suggestions.push({
      title: "Improve Your Sleep",
      text: "Aim for 7–9 hours of sleep. Reduce screen time before bed and try sleeping at the same time every night."
    });
  }

  if (sleep >= 7 && stress <= 4) {
    suggestions.push({
      title: "Great Progress",
      text: "You're maintaining healthy habits. Keep following your routine and continue checking in with yourself."
    });
  }

  return (
    <div className="mt-8 bg-white dark:bg-[#23372E] rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-emerald-700 dark:text-green-300 mb-6">
        Personalized Wellness Suggestions
      </h2>

      <div className="space-y-5">

        {suggestions.map((item, index) => (
          <div
            key={index}
            className="border-l-4 border-emerald-600 bg-emerald-50 dark:bg-[#30453A] rounded-xl p-5"
          >
            <h3 className="font-semibold text-lg mb-2">
              {item.title}
            </h3>

            <p className="leading-7">
              {item.text}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Suggestions;