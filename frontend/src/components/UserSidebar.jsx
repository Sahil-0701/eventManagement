import { NavLink } from "react-router-dom";
import {
  Home,
  Ticket,
  MessageCircle,
  UserCircle,
  Settings,
} from "lucide-react";

const UserSidebar = () => {
  return (
    <aside className="bg-purple-600 text-white w-full md:w-[15%] md:sticky md:top-[10vh] p-6 h-fit md:h-[calc(100vh-10vh)] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">User Panel</h2>
      <nav className="space-y-4">
        <NavLink
          to="/user"
          className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition"
        >
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/user/my-tickets"
          className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition"
        >
          <Ticket size={20} />
          <span>My Tickets</span>
        </NavLink>
        <NavLink
          to="/user/feedback"
          className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition"
        >
          <MessageCircle size={20} />
          <span>Feedback</span>
        </NavLink>
        <NavLink
          to="/user/profile"
          className="flex items-center space-x-3 hover:bg-purple-500 p-3 rounded-lg transition"
        >
          <UserCircle size={20} />
          <span>Profile</span>
        </NavLink>
    
      </nav>
    </aside>
  );
};

export default UserSidebar;
