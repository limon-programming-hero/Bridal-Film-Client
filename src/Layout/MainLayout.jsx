import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="mx-auto max-w-[1280px] relative">
      <div className="fixed w-full max-w-[1280px] top-0 z-10">
        <Navbar></Navbar>
      </div>
      <div className="mx-auto max-w-[1140px]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
