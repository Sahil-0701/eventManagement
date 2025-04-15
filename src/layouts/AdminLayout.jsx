import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex pt-[10vh] min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
