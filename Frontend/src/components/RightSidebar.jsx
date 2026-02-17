import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/api";

const footerLinks = [
  "About",
  "Help",
  "Press",
  "API",
  "Jobs",
  "Privacy",
  "Terms",
  "Locations",
  "Language",
  "Meta Verified",
];

const RightSidebar = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);

  const [suggestions, setSuggestions] = useState([]);
  const [showSwitchMenu, setShowSwitchMenu] = useState(false);

  // Fetch suggestions from backend
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await api.get("/interact/suggestions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuggestions(res.data.users || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    fetchSuggestions();
  }, [token]);

  // Follow user
  const handleFollow = async (userId) => {
    try {
      const res = await api.put(
        `/interact/follow`, 
        { followId: userId }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.data.status === "following" || res.data.status === "requested") {
        // Only remove from suggestions if follow successful
        setSuggestions((prev) => prev.filter((user) => user._id !== userId));
      }
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  return (
    <div className="w-[320px] pl-16 pt-6 hidden lg:block">
      {/* Current user info + switch menu */}
      <div className="flex items-center justify-between mb-6">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <img
            src={currentUser.avatarUrl}
            alt="Your profile"
            className="w-11 h-11 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {currentUser.username}
            </span>
            <span className="text-sm text-muted-foreground">
              {currentUser.name}
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowSwitchMenu(!showSwitchMenu)}
            className="text-primary text-xs font-semibold hover:text-foreground transition-colors"
          >
            Switch
          </button>

          {showSwitchMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
              <div
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                Switch Account
              </div>
              <div
                onClick={() => navigate("/signup")}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                Create Account
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggested users */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-muted-foreground">
          Suggested for you
        </span>
        <button className="text-xs font-semibold text-foreground hover:text-muted-foreground transition-colors">
          See All
        </button>
      </div>

      <div className="flex flex-col">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion._id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={suggestion.avatarUrl}
                alt={suggestion.username}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm">
                    {suggestion.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Suggested for you
                </span>
              </div>
            </div>
            <button
              onClick={() => handleFollow(suggestion._id)}
              className="text-sm font-semibold text-primary hover:text-foreground transition-colors"
            >
              Follow
            </button>
          </div>
        ))}
      </div>

      {/* Footer links */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-x-1 gap-y-1 text-xs text-text-tertiary mb-4">
          {footerLinks.map((link, index) => (
            <span key={link} className="hover:underline cursor-pointer">
              {link}
              {index < footerLinks.length - 1 && " · "}
            </span>
          ))}
        </div>
        <p className="text-xs text-text-tertiary">© 2026 FOCAL FROM META</p>
      </div>

      {/* Messages shortcut */}
      <div
        onClick={() => navigate("/messages")}
        className="fixed bottom-6 right-6 bg-foreground text-background rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg cursor-pointer hover:bg-muted-foreground transition-colors"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
        <span className="font-medium text-sm">Messages</span>
      </div>
    </div>
  );
};

export default RightSidebar;
