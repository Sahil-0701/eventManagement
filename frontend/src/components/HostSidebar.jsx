import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, CalendarDays, Users, BarChart, Settings } from "lucide-react";

const HostSidebar = () => {
  return (
    <aside className="bg-purple-600 text-white w-full md:w-[15%] md:sticky md:top-[10vh] p-6 h-fit md:h-[calc(100vh-10vh)] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Host Panel</h2>
      <nav className="space-y-4">
        <NavLink
          to="/host-dashboard"
          className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/host-dashboard/create-event"
          className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition"
        >
          <PlusCircle size={20} />
          <span>Create Event</span>
        </NavLink>
        <NavLink
          to="/host-dashboard/my-events"
          className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition"
        >
          <CalendarDays size={20} />
          <span>My Events</span>
        </NavLink>
        <NavLink
          to="/host-dashboard/team"
          className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition"
        >
          <Users size={20} />
          <span>Team Management</span>
        </NavLink>
        <NavLink
          to="/host-dashboard/profit"
          className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition"
        >
          <BarChart size={20} />
          <span>Profit Report</span>
        </NavLink>
        <NavLink
          to="/host-dashboard/settings"
          className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition"
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default HostSidebar;
