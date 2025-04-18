import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserSidebar from "../components/UserSidebar";


const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex pt-[10vh] min-h-screen bg-gray-100">
        {/* Uncomment below if you plan to include a sidebar */}
        <UserSidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
