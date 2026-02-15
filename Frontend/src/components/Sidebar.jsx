import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Compass,
  Film,
  Send,
  Heart,
  PlusSquare,
  Menu,
} from "lucide-react";
import CreatePostModal from "./CreatePostModel";
import { currentUser } from "../data/mockData";
import { useSelector } from "react-redux";


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const notifications = useSelector(
  (state) => state.notifications.list
);


  const menuRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  //Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const links = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Film, label: "Reels", path: "/reels" },
    { icon: Send, label: "Messages", path: "/messages" },
    
    { icon: Heart, label: "Notifications", path: "/notifications" },
    { icon: PlusSquare, label: "Create", action: () => setShowCreateModal(true) },
  ];

  return (
    <>
      <aside
        className="
        fixed left-3 top-3 bottom-3
        w-[72px] xl:w-[250px]
        rounded-2xl
        border border-black/10 dark:border-white/10
        bg-white/70 dark:bg-zinc-900/70
        backdrop-blur-xl
        flex flex-col px-3 py-6
        z-40 shadow-lg
      "
      >
        {/* LOGO */}
        <div
          className="px-3 py-4 mb-6 cursor-pointer flex items-center justify-center xl:justify-start"
          onClick={() => navigate("/home")}
        >
          <span className="hidden xl:block text-xl font-bold tracking-tight">
            Focal
          </span>
        </div>

        {/* NAV LINKS */}
        <nav className="flex flex-col gap-1 flex-1">
          {links.map((link) => {
            const active = link.path ? isActive(link.path) : false;

            return (
              <div
                key={link.label}
                onClick={() => {
                  if (link.action) link.action();
                  else if (link.path) navigate(link.path);
                }}
                className={`
                  flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer
                  transition-all duration-200
                  ${
                    active
                      ? "bg-black text-white dark:bg-white dark:text-black font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
                  }
                `}
              >
              <div className="relative">
  <link.icon className="w-6 h-6" />

  {link.label === "Notifications" && notifications.length > 0 && (
    <>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
    </>
  )}
</div>

                <span className="hidden xl:block">{link.label}</span>
              </div>
            );
          })}

          {/* PROFILE */}
          <div
            onClick={() => navigate("/profile")}
            className={`
              flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer
              transition-all duration-200
              ${
                isActive("/profile")
                  ? "bg-black text-white dark:bg-white dark:text-black font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
              }
            `}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img
                src={currentUser.avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden xl:block">Profile</span>
          </div>
        </nav>

        {/* BOTTOM MENU */}
        <div className="mt-auto relative" ref={menuRef}>
          <div
            className="flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setShowMoreMenu(!showMoreMenu)}
          >
            <Menu className="w-6 h-6" />
            <span className="hidden xl:block">More</span>
          </div>

          {showMoreMenu && (
            <div
              className="
              absolute bottom-16 left-0 w-[220px]
              bg-white/90 dark:bg-zinc-900/90
              backdrop-blur-lg
              border border-black/10 dark:border-white/10
              rounded-xl shadow-xl overflow-hidden
              animate-fadeIn
            "
            >
              <div
                onClick={() => {
                  navigate("/settings");
                  setShowMoreMenu(false);
                }}
                className="px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition"
              >
                Settings
              </div>
            </div>
          )}
        </div>
      </aside>

      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
};

export default Sidebar;

