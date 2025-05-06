import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { SiEventstore } from "react-icons/si";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getHomeLink = () => {
    if (user) {
      switch (user.role) {
        case "admin":
          return "/admin/dashboard";
        case "host":
          return "/host/dashboard";
        default:
          return "/user/dashboard";
      }
    }
    return "/";
  };

  return (
    <nav className="sticky top-0 left-0 w-full h-[10vh] z-50 bg-[#EFEFEF] backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-full">
        {/* Company Name */}
        <div className="flex-shrink-0">
          <Link
            to={getHomeLink()}
            className="text-2xl font-bold text-[#3F7D58] flex items-center"
          >
            <SiEventstore className="mr-2" />
            TrueEvents
          </Link>
        </div>

        {/* Navigation Links for non-logged-in users */}
        {!user && (
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-[#3F7D58] hover:text-[#EC5228] transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-[#3F7D58] hover:text-[#EC5228] transition-colors"
            >
              About
            </Link>
            <Link
              to="/events"
              className="text-[#3F7D58] hover:text-[#EC5228] transition-colors"
            >
              Events
            </Link>
          </div>
        )}

        {/* User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button
              onClick={logout}
              className="flex items-center text-[#3F7D58] hover:text-[#EC5228] transition-colors"
            >
              <LogOut className="w-5 h-5 mr-1" />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#3F7D58] hover:text-[#EC5228] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#EC5228] text-white px-4 py-2 rounded-xl hover:bg-[#EF9651] transition-colors shadow-lg hover:shadow-xl"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#3F7D58]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#EFEFEF] backdrop-blur-sm border-t mt-[10vh]">
          <div className="flex flex-col space-y-4 p-4">
            {!user && (
              <>
                <Link
                  to="/"
                  className="text-[#3F7D58] hover:text-[#EC5228] transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-[#3F7D58] hover:text-[#EC5228] transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/events"
                  className="text-[#3F7D58] hover:text-[#EC5228] transition-colors"
                >
                  Events
                </Link>
              </>
            )}
            {user ? (
              <button
                onClick={logout}
                className="flex items-center text-[#3F7D58] hover:text-[#EC5228] transition-colors"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#3F7D58] hover:text-[#EC5228] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-[#3F7D58] hover:text-[#EC5228] transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
