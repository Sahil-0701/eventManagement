import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="mt-[10vh] min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
