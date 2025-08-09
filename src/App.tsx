import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "src/layouts/UserLayout";
import Login from "src/pages/other/LoginPage";
import SignUp from "src/pages/other/SignupPage";
import Cart from "src/pages/user/Cart";
import CourseDetail from "src/pages/user/CourseDetail/CourseDetail";
import Courses from "src/pages/user/Courses";
import LandingPage from "src/pages/user/LandingPage";
import Lecture from "src/pages/user/Lecture";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course/:id/lecture/:lectureId" element={<Lecture />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
