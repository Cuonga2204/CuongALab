import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "src/layouts/AdminLayout";
import UserLayout from "src/layouts/UserLayout";
import CoursesScreen from "src/pages/admin/screens/CourseScreen";
import DashboardScreen from "src/pages/admin/screens/DashboardScreen/DashboardScreen";
import UsersScreen from "src/pages/admin/screens/UserScreen";
import Login from "src/pages/other/auth/Screens/LoginSceen";
import Signup from "src/pages/other/auth/Screens/SignupScreen/SignUpScreen";
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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardScreen />} />
          <Route path="users" element={<UsersScreen />} />
          <Route path="courses" element={<CoursesScreen />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
