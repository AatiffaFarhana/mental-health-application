import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleToggle = () => {
    gsap.fromTo(
      buttonRef.current,
      {
        rotate: 0,
        scale: 1,
      },
      {
        rotate: 360,
        scale: 1.15,
        duration: 0.5,
        ease: "back.out(1.7)",
      }
    );

    setDarkMode(!darkMode);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className="
      w-12
      h-12
      rounded-full
      bg-emerald-600
      hover:bg-emerald-700
      text-white
      shadow-lg
      transition
      "
    >
      {darkMode ? "☀" : "🌙"}
    </button>
  );
}

export default ThemeToggle;