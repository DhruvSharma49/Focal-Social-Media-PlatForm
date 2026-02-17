import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Sidebar from "./components/Sidebar";
import Index from "./components/HomePageLayout";
import Search from "./Pages/Search";
import Explore from "./Pages/Expore";
import Reels from "./Pages/Reels";
import Messages from "./Pages/Message";
import Notifications from "./Pages/Notification";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import NotFound from "./components/NotFound";
import AuthLayout from "./components/AuthLayout";
import { socket } from "./utils/socket";
import UserProfile from "./Pages/Userprofile";
import Protected from "./components/RequireAuth";
import {
  addNotification,
  setNotifications,
} from "./redux/slices/notificationSlice";
import api from "./utils/api";

const queryClient = new QueryClient();

const MainLayout = ({ children, showSidebar = true }) => (
  <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex transition-colors">
    {showSidebar && <Sidebar />}
    <main className={`flex-1 ${showSidebar ? "ml-[72px] xl:ml-[244px]" : ""}`}>
      {children}
    </main>
  </div>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // First load: apply saved theme instantly
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Sync darkMode state changes with html & localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    if (user?._id) {
      socket.connect();
      socket.emit("registerUser", user._id);

      // ✅ Fetch DB notifications on login
      const fetchNotifications = async () => {
        const res = await api.get("/interact/notifications", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const formatted = res.data.notifications.map((n) => ({
          _id: n._id,
          type: n.type,
          message: "sent you a follow request",
          user: n.from,
        }));

        dispatch(setNotifications(formatted));
      };

      fetchNotifications();

      socket.on("newFollowRequest", (data) => {
        dispatch(
          addNotification({
            _id: data._id,
            type: "followRequest",
            message: "sent you a follow request",
            user: data.fromUser,
          }),
        );
      });
    }

    return () => {
      socket.off("newFollowRequest");
    };
  }, [user]);

  return (
   


     <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public pages with AuthLayout + Protected */}
          <Route
            element={
              <Protected authentication={false}>
                <AuthLayout />
              </Protected>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected pages */}
          <Route
            path="/home"
            element={
              <Protected authentication={true}>
                <MainLayout>
                  <Index />
                </MainLayout>
              </Protected>
            }
          />
          <Route
            path="/search"
            element={
              <Protected authentication={true}>
                <MainLayout>
                  <Search />
                </MainLayout>
              </Protected>
            }
          />
          <Route
            path="/explore"
            element={
              <Protected authentication={true}>
                <MainLayout>
                  <Explore />
                </MainLayout>
              </Protected>
            }
          />
          <Route
            path="/reels"
            element={
              <Protected authentication={true}>
                <MainLayout>
                  <Reels />
                </MainLayout>
              </Protected>
            }
          />
          <Route
            path="/messages"
            element={
              <Protected authentication={true}>
                <MainLayout>
                  <Messages />
                </MainLayout>
              </Protected>
            }
          />
          <Route
            path="/notifications"
            element={
              <Protected authentication={true}>
                <MainLayout>
                  <Notifications />
                </MainLayout>
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected authentication={true}>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </Protected>
            }
          />
          <Route
            path="/otherprofile/:id"
            element={
              <Protected authentication={true}>
                <MainLayout>
                  <UserProfile />
                </MainLayout>
              </Protected>
            }
          />
          <Route
            path="/settings"
            element={
              <Protected authentication={true}>
                <MainLayout>
                  <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
                </MainLayout>
              </Protected>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
