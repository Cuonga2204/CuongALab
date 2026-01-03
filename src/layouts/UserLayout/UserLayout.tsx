import { Outlet } from "react-router-dom";
import Footer from "src/pages/user/Footer";
import Header from "src/pages/user/Header";
import Chatbot from "src/pages/user/Lecture/component/ai/Chatbot";

export default function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Chatbot />
      <Footer />
    </>
  );
}
