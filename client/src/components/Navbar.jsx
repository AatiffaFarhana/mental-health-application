import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useAuth } from "../context/AuthContext";
// import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const navRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setProfileOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-emerald-700 font-semibold"
      : "text-gray-700 hover:text-emerald-600 transition";

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[9999] bg-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <NavLink
          to="/"
          className="text-2xl font-bold text-emerald-700"
        >
          It's Okay To Not Be Okay
        </NavLink>

        <div className="hidden md:flex items-center gap-8">

          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>

          <NavLink to="/mood-tracker" className={linkStyle}>
            Mood Tracker
          </NavLink>

          <NavLink to="/awareness" className={linkStyle}>
            Awareness
          </NavLink>

          <NavLink to="/resources" className={linkStyle}>
            Resources
          </NavLink>

          {/* <ThemeToggle /> */}

          {user ? (
            <div className="relative">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center transition"
              >
                {getInitials(user.name)}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border overflow-hidden">

                  <div className="px-5 py-4 bg-emerald-50">

                    <p className="font-bold text-gray-800">
                      {user.name}
                    </p>

                    <p className="text-sm text-gray-500 break-all">
                      {user.email}
                    </p>

                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 hover:bg-red-50 text-red-600 transition"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <>
              <NavLink to="/login" className={linkStyle}>
                Login
              </NavLink>

              <NavLink to="/register" className={linkStyle}>
                Register
              </NavLink>
            </>
          )}

        </div>

        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col bg-white px-6 pb-6 gap-5">

          <NavLink
            to="/"
            className={linkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/mood-tracker"
            className={linkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Mood Tracker
          </NavLink>

          <NavLink
            to="/awareness"
            className={linkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Awareness
          </NavLink>

          <NavLink
            to="/resources"
            className={linkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Resources
          </NavLink>

          {user ? (
            <>
              <div className="border-t pt-4">

                <p className="font-semibold text-emerald-700">
                  {user.name}
                </p>

                <p className="text-sm text-gray-500">
                  {user.email}
                </p>

              </div>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}

          {/* <ThemeToggle /> */}

        </div>
      )}

    </nav>
  );
}

export default Navbar;