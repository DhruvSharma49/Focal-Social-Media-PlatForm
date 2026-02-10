// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { 
//   Home, 
//   Search, 
//   Compass, 
//   Film, 
//   Send, 
//   Heart, 
//   PlusSquare, 
//   Menu,
//   Instagram
// } from "lucide-react";
// import CreatePostModal from "./CreatePostModal";
// import { currentUser } from "@/data/mockData";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showMoreMenu, setShowMoreMenu] = useState(false);

//   const isActive = (path: string) => location.pathname === path;

//   const links = [
//     { icon: Home, label: "Home", path: "/" },
//     { icon: Search, label: "Search", path: "/search" },
//     { icon: Compass, label: "Explore", path: "/explore" },
//     { icon: Film, label: "Reels", path: "/reels" },
//     { icon: Send, label: "Messages", path: "/messages" },
//     { icon: Heart, label: "Notifications", path: "/notifications" },
//     { icon: PlusSquare, label: "Create", action: () => setShowCreateModal(true) },
//   ];

//   return (
//     <>
//       <aside className="fixed left-0 top-0 h-screen w-[72px] xl:w-[244px] border-r border-divider flex flex-col px-3 py-6 z-40 bg-background">
//         {/* Logo */}
//         <div className="px-3 py-4 mb-4 cursor-pointer" onClick={() => navigate("/")}>
//           <Instagram className="w-6 h-6 xl:hidden" />
//           <span className="hidden xl:block text-xl font-semibold tracking-tight italic">
//             Instagram
//           </span>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex flex-col gap-1 flex-1">
//           {links.map((link) => {
//             const active = link.path ? isActive(link.path) : false;
            
//             return (
//               <div
//                 key={link.label}
//                 onClick={() => {
//                   if (link.action) {
//                     link.action();
//                   } else if (link.path) {
//                     navigate(link.path);
//                   }
//                 }}
//                 className={`sidebar-link ${active ? 'sidebar-link-active' : ''}`}
//               >
//                 <link.icon className={`w-6 h-6 ${active ? 'stroke-[2.5px]' : ''}`} />
//                 <span className="hidden xl:block">{link.label}</span>
//               </div>
//             );
//           })}
          
//           {/* Profile with Avatar */}
//           <div
//             onClick={() => navigate("/profile")}
//             className={`sidebar-link ${isActive("/profile") ? 'sidebar-link-active' : ''}`}
//           >
//             <div className={`w-6 h-6 rounded-full overflow-hidden ${isActive("/profile") ? 'ring-2 ring-foreground' : ''}`}>
//               <img 
//                 src={currentUser.avatarUrl}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <span className="hidden xl:block">Profile</span>
//           </div>
//         </nav>

//         {/* Bottom Menu */}
//         <div className="mt-auto relative">
//           <div 
//             className="sidebar-link"
//             onClick={() => navigate("/threads")}
//           >
//             <div className="w-6 h-6 flex items-center justify-center">
//               <svg viewBox="0 0 192 192" className="w-6 h-6" fill="currentColor">
//                 <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C120.004 17.1123 137.552 24.4614 149.086 38.788C154.753 45.8136 159.101 54.4511 162.057 64.4364L178.282 60.5457C174.623 47.8874 169.095 37.1364 161.651 28.4717C146.851 10.8295 125.499 1.43746 97.0695 1.22849C96.7178 1.22706 96.3661 1.22706 96.0144 1.22849C67.772 1.43319 46.6018 10.7621 31.8134 28.2903C18.1496 44.5152 10.8354 67.5143 10.6063 96.0055C10.8354 124.486 18.1496 147.485 31.8134 163.71C46.6018 181.238 67.772 190.567 96.0144 190.771C96.3661 190.773 96.7178 190.773 97.0695 190.771C122.03 190.579 139.824 183.853 153.876 169.816C173.533 150.185 172.964 125.657 166.77 111.427C162.14 100.896 153.218 92.5563 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
//               </svg>
//             </div>
//             <span className="hidden xl:block">Threads</span>
//           </div>
          
//           <div 
//             className="sidebar-link"
//             onClick={() => setShowMoreMenu(!showMoreMenu)}
//           >
//             <Menu className="w-6 h-6" />
//             <span className="hidden xl:block">More</span>
//           </div>

//           {/* More menu dropdown */}
//           {showMoreMenu && (
//             <div className="absolute bottom-14 left-0 w-[266px] bg-secondary rounded-xl shadow-lg overflow-hidden">
//               <div
//                 onClick={() => {
//                   navigate("/settings");
//                   setShowMoreMenu(false);
//                 }}
//                 className="px-4 py-3 hover:bg-accent cursor-pointer flex items-center gap-3"
//               >
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <circle cx="12" cy="12" r="3"/>
//                   <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
//                 </svg>
//                 <span className="text-sm">Settings</span>
//               </div>
//               <div className="px-4 py-3 hover:bg-accent cursor-pointer flex items-center gap-3">
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/>
//                 </svg>
//                 <span className="text-sm">Switch appearance</span>
//               </div>
//               <div className="px-4 py-3 hover:bg-accent cursor-pointer flex items-center gap-3">
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
//                 </svg>
//                 <span className="text-sm">Your activity</span>
//               </div>
//               <div className="px-4 py-3 hover:bg-accent cursor-pointer flex items-center gap-3">
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                   <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                 </svg>
//                 <span className="text-sm">Saved</span>
//               </div>
//               <div className="border-t border-divider" />
//               <div className="px-4 py-3 hover:bg-accent cursor-pointer flex items-center gap-3">
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
//                 </svg>
//                 <span className="text-sm">Log out</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </aside>

//       <CreatePostModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
//     </>
//   );
// };

// export default Sidebar;



import React, { useState } from "react";
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
  Instagram,
} from "lucide-react";
import CreatePostModal from "./CreatePostModel";
import { currentUser } from "../data/mockData"; // FIXED PATH

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

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
      <aside className="fixed left-0 top-0 h-screen w-[72px] xl:w-[244px] border-r border-divider flex flex-col px-3 py-6 z-40 bg-background">
        <div className="px-3 py-4 mb-4 cursor-pointer" onClick={() => navigate("/")}>
      
          <span className="hidden xl:block text-xl font-semibold tracking-tight italic">
            Instagram
          </span>
        </div>

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
                className={`sidebar-link ${active ? "sidebar-link-active" : ""}`}
              >
                <link.icon className={`w-6 h-6 ${active ? "stroke-[2.5px]" : ""}`} />
                <span className="hidden xl:block">{link.label}</span>
              </div>
            );
          })}

          <div
            onClick={() => navigate("/profile")}
            className={`sidebar-link ${isActive("/profile") ? "sidebar-link-active" : ""}`}
          >
            <div className={`w-6 h-6 rounded-full overflow-hidden ${isActive("/profile") ? "ring-2 ring-foreground" : ""}`}>
              <img src={currentUser.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <span className="hidden xl:block">Profile</span>
          </div>
        </nav>

        <div className="mt-auto relative">
          <div className="sidebar-link" onClick={() => navigate("/threads")}>
            <div className="w-6 h-6 flex items-center justify-center">
              <svg viewBox="0 0 192 192" className="w-6 h-6" fill="currentColor">
                <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C120.004 17.1123 137.552 24.4614 149.086 38.788C154.753 45.8136 159.101 54.4511 162.057 64.4364L178.282 60.5457C174.623 47.8874 169.095 37.1364 161.651 28.4717C146.851 10.8295 125.499 1.43746 97.0695 1.22849C96.7178 1.22706 96.3661 1.22706 96.0144 1.22849C67.772 1.43319 46.6018 10.7621 31.8134 28.2903C18.1496 44.5152 10.8354 67.5143 10.6063 96.0055C10.8354 124.486 18.1496 147.485 31.8134 163.71C46.6018 181.238 67.772 190.567 96.0144 190.771C96.3661 190.773 96.7178 190.773 97.0695 190.771C122.03 190.579 139.824 183.853 153.876 169.816C173.533 150.185 172.964 125.657 166.77 111.427C162.14 100.896 153.218 92.5563 141.537 88.9883Z"/>
              </svg>
            </div>
            <span className="hidden xl:block">Threads</span>
          </div>

          <div className="sidebar-link" onClick={() => setShowMoreMenu(!showMoreMenu)}>
            <Menu className="w-6 h-6" />
            <span className="hidden xl:block">More</span>
          </div>

          {showMoreMenu && (
            <div className="absolute bottom-14 left-0 w-[266px] bg-secondary rounded-xl shadow-lg overflow-hidden">
              <div onClick={() => { navigate("/settings"); setShowMoreMenu(false); }} className="px-4 py-3 hover:bg-accent cursor-pointer flex items-center gap-3">
                <span className="text-sm">Settings</span>
              </div>
              <div className="border-t border-divider" />
              <div className="px-4 py-3 hover:bg-accent cursor-pointer flex items-center gap-3">
                <span className="text-sm">Log out</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      <CreatePostModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </>
  );
};

export default Sidebar;
