import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "src/layouts/UserLayout";
import Login from "src/pages/other/LoginPage";
import SignUp from "src/pages/other/SignupPage";
import Courses from "src/pages/user/Courses";
import LandingPage from "src/pages/user/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/course" element={<Courses />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
