// src/layouts/HostLayout.jsx
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HostSidebar from "../components/HostSidebar";


const HostLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex  min-h-screen bg-gray-100">
        <HostSidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HostLayout;
