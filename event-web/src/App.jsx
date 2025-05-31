import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import JoinUs from "./pages/JoinUs";
import MainLayout from "./layout/MainLayout";
import EventDetails from "./pages/EventDetails";
import Payment from "./pages/Payment";
import BookingInfo from "./pages/BookingInfo";
import CartPage from "./pages/CartPage";
import Confirmation from "./pages/Confirmation";
import Bookings from "./pages/Bookings";

const AppContent = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/join-us";

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthRoute ? (
        <Routes>
          <Route path="/join-us" element={<JoinUs />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/booking-info" element={<BookingInfo />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
