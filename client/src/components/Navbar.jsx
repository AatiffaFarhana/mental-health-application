import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
// import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const navRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);
  useEffect(() => {
  if (!user) return;

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      setProfile(res.data);
    } catch (err) {
      console.log(err);
      setProfile(null);
    }
  };

  fetchProfile();

}, [user]);
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
                <div className="absolute right-0 top-14 w-72 bg-white rounded-2xl shadow-2xl border">

                  <div className="px-5 py-4 bg-emerald-50">

                    <p className="font-bold text-gray-800">
                      {user.name}
                    </p>

                    <p className="text-sm text-gray-500 break-all">
                      {user.email}
                    </p>

                  </div>
                  <div className="p-6 space-y-4">

                    <p>
                      📝 Mood Entries :
                      <strong> {profile.moodCount}</strong>
                    </p>

                    <p>
                      😊 Latest Mood :
                      <strong> {profile.latestMood}</strong>
                    </p>

                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-3"
                    >
                      Logout
                    </button>

                  </div>

                  {/* <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 hover:bg-red-50 text-red-600 transition"
                  >
                    Logout
                  </button> */}

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

              <div className="relative">

                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-11 h-11 rounded-full bg-emerald-600 text-white font-bold text-lg flex items-center justify-center"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>

                {profileOpen && profile && (

                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl p-5">

                    <h3 className="text-xl font-bold text-emerald-700">
                      👤 {profile.name}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {profile.email}
                    </p>

                    <hr className="my-4" />

                    <p>
                      📝 Mood Entries : <strong>{profile.moodCount}</strong>
                    </p>

                    <p className="mt-2">
                      😊 Latest Mood : <strong>{profile.latestMood}</strong>
                    </p>

                    <button
                      onClick={handleLogout}
                      className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-2"
                    >
                      Logout
                    </button>

                  </div>

                )}

              </div>
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