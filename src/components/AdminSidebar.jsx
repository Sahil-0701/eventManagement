import { Home, PlusCircle, Users, Settings, CalendarDays, ListOrdered, ClipboardList, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="bg-purple-600 text-white w-full md:w-[15%] md:sticky md:top-[10vh] p-6 h-fit md:h-[calc(100vh-10vh)] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav className="space-y-4">
        <NavLink to="/admin-dashboard" className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin-dashboard/post-event" className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition">
          <PlusCircle size={20} />
          <span>Post Event</span>
        </NavLink>
        <NavLink to="/admin-dashboard/events" className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition">
          <ListOrdered size={20} />
          <span>Manage Events</span>
        </NavLink>
        <NavLink to="/admin-dashboard/schedule" className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition">
          <CalendarDays size={20} />
          <span>Schedule</span>
        </NavLink>
        <NavLink to="/admin-dashboard/users" className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition">
          <Users size={20} />
          <span>Manage Users</span>
        </NavLink>
        <NavLink to="/admin-dashboard/registrations" className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition">
          <ClipboardList size={20} />
          <span>Registrations</span>
        </NavLink>
        <NavLink to="/admin-dashboard/settings" className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
