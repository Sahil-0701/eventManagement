import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";
import HostLayout from "./layouts/HostLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EventDetails from "./pages/EventDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/Profile";
import UserBookings from "./pages/user/MyBookings";
import UserEventDetails from "./pages/user/EventDetails";
import UserEvents from "./pages/user/UserEvents";
import EventPayment from "./pages/user/EventPayment";
import MyTickets from "./pages/user/MyTickets";

// Host Pages
import HostDashboard from "./pages/host/HostDashboard";
import CreateEvent from "./pages/host/CreateEvent";
import MyEvents from "./pages/host/MyEvents";
import TeamManagement from "./pages/host/TeamManagement";
import ProfitReport from "./pages/host/ProfitReport";
import HostSettings from "./pages/host/HostSettings";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCreateEvent from "./pages/admin/CreateEvent";
import AdminManageEvents from "./pages/admin/ManageEvents";
import AdminSchedule from "./pages/admin/Schedule";
import AdminUsers from "./pages/admin/Users";
import AdminRegistrations from "./pages/admin/Registrations";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

function App() {
  return (
    <AuthProvider>
      <Router>
  <Routes>
    {/* ✅ Public Layout */}
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="events" element={<Events />} />
      <Route path="events/:id" element={<EventDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Route>

    {/* ✅ User Routes (After Login) */}
    <Route path="/user" element={
      <ProtectedRoute roles={["user"]}>
        <UserLayout />
      </ProtectedRoute>
    }>
      <Route index element={<UserDashboard />} />
      <Route path="dashboard" element={<UserDashboard />} />
      <Route path="profile" element={<UserProfile />} />
      <Route path="bookings" element={<UserBookings />} />
      <Route path="events" element={<UserEvents />} />
      <Route path="events/:id" element={<UserEventDetails />} />
      <Route path="events/:id/payment" element={<EventPayment />} />
      <Route path="my-tickets" element={<MyTickets />} />
    </Route>

    {/* ✅ Host Routes (After Login) */}
    <Route path="/host" element={
      <ProtectedRoute roles={["host"]}>
        <HostLayout />
      </ProtectedRoute>
    }>
      <Route index element={<HostDashboard />} />
      <Route path="dashboard" element={<HostDashboard />} />
      <Route path="create-event" element={<CreateEvent />} />
      <Route path="my-events" element={<MyEvents />} />
      <Route path="team-management" element={<TeamManagement />} />
      <Route path="profit-report" element={<ProfitReport />} />
      <Route path="settings" element={<HostSettings />} />
    </Route>

    {/* ✅ Admin Routes (After Login) */}
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="events" element={<AdminManageEvents />} />
      <Route path="events/create" element={<AdminCreateEvent />} />
      <Route path="events/:id" element={<EventDetails />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="settings" element={<AdminSettings />} />
    </Route>
  </Routes>
</Router>

    </AuthProvider>
  );
}

export default App;
