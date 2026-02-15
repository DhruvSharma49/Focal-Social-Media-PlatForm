import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  Eye,
  User,
  MessageSquare,
  Star,
  HelpCircle,
  Info,
  ChevronRight,
  Moon,
  Globe,
} from "lucide-react";

import PrivacySettings from "./PrivacySetting";

const Settings = ({ darkMode, setDarkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const settingsSections = [
    {
      title: "How you use Instagram",
      items: [
        { icon: User, label: "Edit profile" },
        { icon: Bell, label: "Notifications" },
      ],
    },
    {
      title: "Who can see your content",
      items: [
        {
          icon: Lock,
          label: "Account privacy",
          action: () => setShowPrivacy(true),
        },
        { icon: Star, label: "Close friends" },
        { icon: Eye, label: "Hidden words" },
      ],
    },
    {
      title: "How others can interact with you",
      items: [
        { icon: MessageSquare, label: "Messages and story replies" },
        { icon: User, label: "Tags and mentions" },
      ],
    },
    {
      title: "What you see",
      items: [
        { icon: Star, label: "Favorites" },
        { icon: Eye, label: "Muted accounts" },
      ],
    },
    {
      title: "Your app and media",
      items: [
        { icon: Globe, label: "Language" },
        { icon: Moon, label: "Dark mode", toggle: true },
      ],
    },
    {
      title: "More info and support",
      items: [
        { icon: HelpCircle, label: "Help" },
        { icon: Info, label: "About" },
      ],
    },
  ];

  const filteredSections = settingsSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((section) => section.items.length > 0);

  if (showPrivacy) {
    return <PrivacySettings onBack={() => setShowPrivacy(false)} />;
  }

  return (
    <div className="max-w-[600px] mx-auto px-4 py-6 text-black dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-6 h-6" />
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search settings"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full dark:text-white dark:bg-zinc-800 rounded-lg py-2.5 px-4 text-sm outline-none"
        />
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {filteredSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {section.title}
            </h2>

            <div className="bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden">
              {section.items.map((item, index) => (
                <div
                  key={item.label}
                  onClick={item.action || (() => {})}
                  className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 transition ${
                    index !== section.items.length - 1
                      ? "border-b border-gray-300 dark:border-zinc-700"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>

                  {/* Toggle */}
                  {item.toggle ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDarkMode(!darkMode);
                      }}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                        darkMode ? "bg-blue-600" : "bg-gray-400"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                          darkMode ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-10 border-t border-gray-300 dark:border-zinc-700 pt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-semibold transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;


