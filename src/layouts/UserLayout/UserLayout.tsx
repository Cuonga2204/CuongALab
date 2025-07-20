import { Outlet } from "react-router-dom";
import Footer from "src/pages/user/Footer";
import Header from "src/pages/user/Header";

export default function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
