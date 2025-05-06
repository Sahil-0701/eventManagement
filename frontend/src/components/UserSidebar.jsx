import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  UserCircle,
  Calendar,
  Search
} from "lucide-react";

const UserSidebar = () => {
  return (
    <aside className="bg-purple-600 text-white w-full  md:sticky md:top-[10vh] p-6 h-fit md:h-[calc(100vh-10vh)] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">User Panel</h2>
      <nav className="space-y-4">
        <NavLink
          to="/user/dashboard"
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
          to="/user/bookings"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <Ticket size={20} />
          <span>My Bookings</span>
        </NavLink>

        <NavLink
          to="/user/events"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <Search size={20} />
          <span>Browse Events</span>
        </NavLink>

        <NavLink
          to="/user/my-tickets"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <Ticket size={20} />
          <span>My Tickets</span>
        </NavLink>

        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition ${
              isActive ? 'bg-purple-700' : 'hover:bg-purple-500'
            }`
          }
        >
          <UserCircle size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default UserSidebar;
