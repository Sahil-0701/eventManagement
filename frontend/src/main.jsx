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
import HostLayout from "./layouts/HostLayout.jsx";
import HostDashboard from "./pages/host/HostDashboard.jsx";
import CreateEvent from "./pages/host/CreateEvent.jsx";
import MyEvents from "./pages/host/MyEvents.jsx";
import TeamManagement from "./pages/host/TeamManagement.jsx";
import ProfitReport from "./pages/host/ProfitReport.jsx";
import HostSettings from "./pages/host/HostSettings.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import EventDetails from "./pages/user/EventDetails.jsx";
import MyTickets from "./pages/user/MyTickets.jsx";
import Feedback from "./pages/user/Feedback.jsx";
import Profile from "./pages/user/Profile.jsx";

import UserHome from "./pages/user/UserHome.jsx";

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
        <Route path="/host-dashboard" element={<HostLayout />}>
          <Route index element={<HostDashboard />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="my-events" element={<MyEvents />} />
          <Route path="team" element={<TeamManagement />} />
          <Route path="profit" element={<ProfitReport />} />
          <Route path="settings" element={<HostSettings />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="my-tickets" element={<MyTickets />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
