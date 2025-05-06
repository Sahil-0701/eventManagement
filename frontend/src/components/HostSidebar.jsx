import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  PlusCircle, 
  CalendarDays, 
  Users, 
  BarChart, 
  Settings,
  ClipboardList,
  UserCog
} from "lucide-react";

const HostSidebar = () => {
  return (
    <aside className="bg-purple-600 text-white w-full md:w-[15%] md:sticky md:top-[10vh] p-6 h-fit md:h-[calc(100vh-10vh)] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Host Panel</h2>
      <nav className="space-y-4">
        <NavLink
          to="/host/dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
          end
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/host/create-event"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <PlusCircle size={20} />
          <span>Create Event</span>
        </NavLink>

        <NavLink
          to="/host/my-events"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <CalendarDays size={20} />
          <span>My Events</span>
        </NavLink>

        <NavLink
          to="/host/team-management"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <Users size={20} />
          <span>Team Management</span>
        </NavLink>

        <NavLink
          to="/host/profit-report"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <BarChart size={20} />
          <span>Profit Report</span>
        </NavLink>

        <NavLink
          to="/host/settings"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default HostSidebar;
