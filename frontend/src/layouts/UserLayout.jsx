import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserSidebar from "../components/UserSidebar";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-80px)] bg-gray-100"> {/* 80px = navbar height */}
        <div className="w-full md:w-[250px]">
          <UserSidebar />
        </div>
        <main className="flex-1 p-0 overflow-x-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
