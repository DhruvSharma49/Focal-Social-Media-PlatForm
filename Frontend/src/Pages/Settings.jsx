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

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  if (showPrivacy)
    return <PrivacySettings onBack={() => setShowPrivacy(false)} />;

  return (
    <div className="max-w-[600px] mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-6 h-6" />
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search settings"
          className="w-full bg-secondary rounded-lg py-2.5 px-4 text-sm"
        />
      </div>

      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-sm text-muted-foreground mb-2">
              {section.title}
            </h2>
            <div className="bg-secondary rounded-lg overflow-hidden">
              {section.items.map((item, index) => (
                <div
                  key={item.label}
                  onClick={item.action || (() => {})}
                  className={`flex items-center justify-between p-4 cursor-pointer hover:bg-accent ${
                    index !== section.items.length - 1
                      ? "border-b border-divider"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>

                  {"toggle" in item && item.toggle ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDarkMode(!darkMode);
                      }}
                      className={`w-10 h-6 rounded-full ${
                        darkMode ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          darkMode ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🔴 LOGOUT */}
      <div className="mt-10 border-t border-divider pt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-semibold"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
