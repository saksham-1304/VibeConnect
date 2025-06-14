import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import useLogout from "../hooks/useLogout";
import GlassCard from "./ui/GlassCard";
import Button from "./ui/Button";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-white/10 dark:bg-white/5 border-b border-white/20 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheelIcon className="w-8 h-8 text-primary-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Streamify
              </span>
            </Link>
          )}

          <div className="flex items-center gap-3 ml-auto">
            <Link to="/notifications">
              <Button variant="ghost" size="sm" className="p-2 rounded-full">
                <BellIcon className="w-5 h-5" />
              </Button>
            </Link>

            <ThemeToggle />

            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary-500/20">
              <img 
                src={authUser?.profilePic} 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logoutMutation}
              className="p-2 rounded-full"
            >
              <LogOutIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;