// index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import Events from "./pages/Events.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import PostEvent from "./pages/admin/PostEvent.jsx";
import ManageEvents from "./pages/admin/ManageEvents.jsx";
import Schedule from "./pages/admin/Schedule.jsx";
import Users from "./pages/admin/Users.jsx";
import Registrations from "./pages/admin/Registrations.jsx";
import Settings from "./pages/admin/Settings.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<Events />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="post-event" element={<PostEvent />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="users" element={<Users />} />
          <Route path="registrations" element={<Registrations />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
