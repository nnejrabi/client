import { Home } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Course from "./pages/Course";
import CourseDetails from "./pages/CourseDetails";
import CourseEditor from "./pages/CourseEditor";
import CoursePlayer from "./pages/CoursePlayer";
import InstructorPanel from "./pages/InstructorPanel";
import MyLearning from "./pages/MyLearning";

const App = () => {
  return (
    <div>
      <Toaster position="bottom-right" />

      <p>Navbar</p>
      <main>
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

      <p>Footer</p>
    </div>
  );
};

export default App;
