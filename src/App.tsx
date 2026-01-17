import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "src/layouts/AdminLayout";
import TeacherLayout from "src/layouts/TeacherLayout/TeacherLayout";
import UserLayout from "src/layouts/UserLayout";
import CategoryScreen from "src/pages/admin/screens/categories/CategoryScreen";
import CoursePricingScreen from "src/pages/admin/screens/CoursePricingScreen/CoursePricingScreen";
import CoursesScreen from "src/pages/admin/screens/CourseScreen";
import DashboardScreen from "src/pages/admin/screens/DashboardScreen/DashboardScreen";
import ReviewFormScreen from "src/pages/admin/screens/ReviewFormScreen/ReviewFormScreen";
import PaymentsScreen from "src/pages/admin/screens/PaymentsScreen";
import QuizBankScreen from "src/pages/admin/screens/QuizBankScreen/QuizBankScreen";
import UserCourseScreen from "src/pages/admin/screens/UserCourseScreen/UserCourseScreen";
import UsersScreen from "src/pages/admin/screens/UserScreen";
import Login from "src/pages/other/auth/Screens/LoginScreen";
import Signup from "src/pages/other/auth/Screens/SignupScreen/SignUpScreen";
import Cart from "src/pages/user/Cart/CartScreen";
import CourseDetail from "src/pages/user/CourseDetail/screens/CourseDetailScreen";
import Courses from "src/pages/user/Courses";
import FavoriteCourse from "src/pages/user/FavoriteCourses/screens/FavoriteCourse";
import ForumScreen from "src/pages/user/Forum/screens/ForumScreen";
import ForumTopicDetailScreen from "src/pages/user/Forum/screens/ForumTopicDetailScreen";
import LandingPage from "src/pages/user/LandingPage";
import Lecture from "src/pages/user/Lecture/screens";
import MyCourses from "src/pages/user/MyCourses/UserCoursesScreen/UserCoursesScreen";
import PaymentFailed from "src/pages/user/Payment/PaymentFailedScreen";
import PaymentSuccess from "src/pages/user/Payment/PaymentSuccessScreen";
import { useAuthStore } from "src/store/authStore";
// import ProtectedRoute from "src/routes/ProtectedRoute";

function App() {
  useEffect(() => {
    useAuthStore.getState().loadAuth();
  }, []);

  return (
    <Router>
      <Routes>
        {/* <Route element={<ProtectedRoute allowedRoles={["user", "teacher"]} />}> */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course/:id/lecture/:lectureId" element={<Lecture />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-course" element={<MyCourses />} />
          <Route path="/favorite-course" element={<FavoriteCourse />} />
          <Route path="/forum" element={<ForumScreen />} />
          <Route
            path="/forum/topic/:topicId"
            element={<ForumTopicDetailScreen />}
          />
        </Route>
        {/* </Route> */}
        {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardScreen />} />
          <Route path="users" element={<UsersScreen />} />
          <Route path="courses" element={<CoursesScreen />} />
          <Route path="payments" element={<PaymentsScreen />} />
          <Route path="course-pricing" element={<CoursePricingScreen />} />
          <Route path="quiz-bank" element={<QuizBankScreen />} />
          <Route path="user-courses" element={<UserCourseScreen />} />
          <Route path="categories" element={<CategoryScreen />} />
          <Route path="review-form" element={<ReviewFormScreen />} />
        </Route>
        {/* </Route> */}
        {/* <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}> */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<DashboardScreen />} />
          <Route path="users" element={<UsersScreen />} />
          <Route path="courses" element={<CoursesScreen />} />
          <Route path="categories" element={<CategoryScreen />} />
          <Route path="quiz-bank" element={<QuizBankScreen />} />
        </Route>
        {/* </Route> */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
    </Router>
  );
}

export default App;
