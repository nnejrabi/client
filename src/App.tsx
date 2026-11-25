import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import Course from "./pages/Course";
import CourseDetails from "./pages/CourseDetails";
import CourseEditor from "./pages/CourseEditor";
import CoursePlayer from "./pages/CoursePlayer";
import InstructorPanel from "./pages/InstructorPanel";
import MyLearning from "./pages/MyLearning";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();
  const isPlayer = location.pathname.startsWith("/learn/");

  return (
    <div
      className={`flex flex-col bg-white font-urbanist ${isPlayer ? "h-screen overflow-hidden" : "min-h-screen"}`}
    >
      <Toaster position="bottom-right" />

      <AuthModal />
      <Navbar />
      <main
        className={`flex-1 ${isPlayer ? "h-screen overflow-hidden" : "min-h-screen"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/learn/:id" element={<CoursePlayer />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/instructor" element={<InstructorPanel />} />
          <Route path="/instructor/editor" element={<CourseEditor />} />
          <Route path="/instructor/editor/:id" element={<CourseEditor />} />
        </Routes>
      </main>

      {!isPlayer && <Footer />}
    </div>
  );
};

export default App;
