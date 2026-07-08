import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import MoodTrackerPage from "./pages/MoodTrackerPage";
import Awareness from "./pages/Awareness";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/mood-tracker" element={<MoodTrackerPage />} />
        <Route path="/awareness" element={<Awareness />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Footer from "./components/Footer";
// import MoodTrackerPage from "./pages/MoodTrackerPage";

// function App(){
//   return (<>
//   <Navbar/>
//   <Routes>
//          <Route path="/" element={<Home />} />
//          <Route path="/mood-tracker" element={<MoodTrackerPage />} />
//          {/* <Route path="/awareness" element={<Awareness />} />
//          <Route path="/resources" element={<Resources />} /> */}
//        </Routes>
//   <Footer/>
//   </>
//   )
// }

// export default App;