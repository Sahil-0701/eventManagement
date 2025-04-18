// src/layouts/HostLayout.jsx
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HostSidebar from "../components/HostSidebar";


const HostLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex pt-[10vh] min-h-screen">
        <HostSidebar />
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HostLayout;
