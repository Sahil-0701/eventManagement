import { 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  Settings, 
  CalendarDays, 
  ListOrdered, 
  ClipboardList,
  BarChart
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="bg-purple-600 text-white w-full md:w-[15%] h-screen md:sticky top-0 p-6 overflow-y-auto">

      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav className="space-y-4">
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/admin/events" 
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <ListOrdered size={20} />
          <span>Manage Events</span>
        </NavLink>

        <NavLink 
          to="/admin/events/create" 
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
          to="/admin/users" 
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <Users size={20} />
          <span>Manage Users</span>
        </NavLink>

        <NavLink 
          to="/admin/reports" 
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <BarChart size={20} />
          <span>Reports</span>
        </NavLink>

        <NavLink 
          to="/admin/settings" 
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

export default AdminSidebar;
