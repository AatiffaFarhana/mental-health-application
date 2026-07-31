import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";
import Resources from "../pages/Resources";

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-emerald-900 text-white mt-20"
    >
      <div className="max-w-7xl mx-auto px-8 py-14">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-2xl font-bold mb-4">
              It's Okay To Not Be Okay
            </h2>

            <p className="text-gray-200 leading-8">
              A supportive platform designed to promote
              emotional well-being through self-care,
              awareness, mood tracking and access to
              reliable mental health resources.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Quick Links
            </h2>

            <ul className="space-y-3">

  <li>
    <NavLink
      to="/"
      className="hover:text-green-300 transition"
    >
      Home
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/mood-tracker"
      className="hover:text-green-300 transition"
    >
      Mood Tracker
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/awareness"
      className="hover:text-green-300 transition"
    >
      Awareness
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/resources"
      className="hover:text-green-300 transition"
    >
      Resources
    </NavLink>
  </li>

</ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Emergency Support
            </h2>

            <p className="text-gray-200 leading-8">
              If you or someone you know is experiencing
              thoughts of self-harm or is in immediate
              danger, contact your local emergency
              services or visit the nearest hospital
              without delay.
            </p>
          </div>

        </div>

        <div className="border-t border-emerald-700 mt-10 pt-6 text-center">

          <p className="text-sm text-gray-300">
            © 2026 It's Okay To Not Be Okay.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;