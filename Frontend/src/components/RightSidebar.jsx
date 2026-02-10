// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { currentUser, users } from "@/data/mockData";

// const suggestions = users.slice(0, 5).map((user) => ({
//   ...user,
//   subtitle: "Suggested for you",
// }));

// const footerLinks = [
//   "About", "Help", "Press", "API", "Jobs", "Privacy", "Terms",
//   "Locations", "Language", "Meta Verified"
// ];

// const RightSidebar = () => {
//   const navigate = useNavigate();
//   const [followedUsers, setFollowedUsers] = useState<string[]>([]);

//   const handleFollow = (userId: string) => {
//     setFollowedUsers((prev) =>
//       prev.includes(userId)
//         ? prev.filter((id) => id !== userId)
//         : [...prev, userId]
//     );
//   };

//   return (
//     <div className="w-[320px] pl-16 pt-6 hidden lg:block">
//       {/* Current User */}
//       <div className="flex items-center justify-between mb-6">
//         <div 
//           className="flex items-center gap-3 cursor-pointer"
//           onClick={() => navigate("/profile")}
//         >
//           <img
//             src={currentUser.avatarUrl}
//             alt="Your profile"
//             className="w-11 h-11 rounded-full object-cover"
//           />
//           <div className="flex flex-col">
//             <span className="font-semibold text-sm">{currentUser.username}</span>
//             <span className="text-sm text-muted-foreground">{currentUser.fullName}</span>
//           </div>
//         </div>
//         <button className="text-primary text-xs font-semibold hover:text-foreground transition-colors">
//           Switch
//         </button>
//       </div>

//       {/* Suggestions Header */}
//       <div className="flex items-center justify-between mb-4">
//         <span className="text-sm font-semibold text-muted-foreground">
//           Suggested for you
//         </span>
//         <button className="text-xs font-semibold text-foreground hover:text-muted-foreground transition-colors">
//           See All
//         </button>
//       </div>

//       {/* Suggestions List */}
//       <div className="flex flex-col">
//         {suggestions.map((suggestion) => (
//           <div key={suggestion.id} className="flex items-center justify-between py-2">
//             <div className="flex items-center gap-3">
//               <img
//                 src={suggestion.avatarUrl}
//                 alt={suggestion.username}
//                 className="w-11 h-11 rounded-full object-cover"
//               />
//               <div className="flex flex-col">
//                 <div className="flex items-center gap-1">
//                   <span className="font-semibold text-sm">{suggestion.fullName}</span>
//                   {suggestion.isVerified && (
//                     <svg className="w-3 h-3 verified-badge" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"/>
//                     </svg>
//                   )}
//                 </div>
//                 <span className="text-xs text-muted-foreground">{suggestion.subtitle}</span>
//               </div>
//             </div>
//             <button
//               onClick={() => handleFollow(suggestion.id)}
//               className={`text-sm font-semibold transition-colors ${
//                 followedUsers.includes(suggestion.id)
//                   ? "text-muted-foreground"
//                   : "text-primary hover:text-foreground"
//               }`}
//             >
//               {followedUsers.includes(suggestion.id) ? "Following" : "Follow"}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="mt-8">
//         <div className="flex flex-wrap gap-x-1 gap-y-1 text-xs text-text-tertiary mb-4">
//           {footerLinks.map((link, index) => (
//             <span key={link} className="hover:underline cursor-pointer">
//               {link}
//               {index < footerLinks.length - 1 && " · "}
//             </span>
//           ))}
//         </div>
//         <p className="text-xs text-text-tertiary">© 2026 INSTAGRAM FROM META</p>
//       </div>

//       {/* Messages Floating Button */}
//       <div 
//         onClick={() => navigate("/messages")}
//         className="fixed bottom-6 right-6 bg-foreground text-background rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg cursor-pointer hover:bg-muted-foreground transition-colors"
//       >
//         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
//         </svg>
//         <span className="font-medium text-sm">Messages</span>
//         <div className="flex -space-x-2">
//           {users.slice(0, 3).map((user) => (
//             <img
//               key={user.id}
//               src={user.avatarUrl}
//               alt=""
//               className="w-6 h-6 rounded-full border-2 border-background object-cover"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RightSidebar;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser, users } from "../data/mockData"; // FIXED PATH

const suggestions = users.slice(0, 5).map((user) => ({
  ...user,
  subtitle: "Suggested for you",
}));

const footerLinks = [
  "About", "Help", "Press", "API", "Jobs", "Privacy", "Terms",
  "Locations", "Language", "Meta Verified"
];

const RightSidebar = () => {
  const navigate = useNavigate();
  const [followedUsers, setFollowedUsers] = useState([]);

  const handleFollow = (userId) => {
    setFollowedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="w-[320px] pl-16 pt-6 hidden lg:block">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/profile")}>
          <img src={currentUser.avatarUrl} alt="Your profile" className="w-11 h-11 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{currentUser.username}</span>
            <span className="text-sm text-muted-foreground">{currentUser.fullName}</span>
          </div>
        </div>
        <button className="text-primary text-xs font-semibold hover:text-foreground transition-colors">
          Switch
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-muted-foreground">Suggested for you</span>
        <button className="text-xs font-semibold text-foreground hover:text-muted-foreground transition-colors">
          See All
        </button>
      </div>

      <div className="flex flex-col">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <img src={suggestion.avatarUrl} alt={suggestion.username} className="w-11 h-11 rounded-full object-cover" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm">{suggestion.fullName}</span>
                  {suggestion.isVerified && (
                    <svg className="w-3 h-3 verified-badge" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"/>
                    </svg>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{suggestion.subtitle}</span>
              </div>
            </div>
            <button
              onClick={() => handleFollow(suggestion.id)}
              className={`text-sm font-semibold transition-colors ${
                followedUsers.includes(suggestion.id)
                  ? "text-muted-foreground"
                  : "text-primary hover:text-foreground"
              }`}
            >
              {followedUsers.includes(suggestion.id) ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-x-1 gap-y-1 text-xs text-text-tertiary mb-4">
          {footerLinks.map((link, index) => (
            <span key={link} className="hover:underline cursor-pointer">
              {link}
              {index < footerLinks.length - 1 && " · "}
            </span>
          ))}
        </div>
        <p className="text-xs text-text-tertiary">© 2026 INSTAGRAM FROM META</p>
      </div>

      <div
        onClick={() => navigate("/messages")}
        className="fixed bottom-6 right-6 bg-foreground text-background rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg cursor-pointer hover:bg-muted-foreground transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
        <span className="font-medium text-sm">Messages</span>
        <div className="flex -space-x-2">
          {users.slice(0, 3).map((user) => (
            <img key={user.id} src={user.avatarUrl} alt="" className="w-6 h-6 rounded-full border-2 border-background object-cover" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;

