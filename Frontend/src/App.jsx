import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Sidebar from "./components/Sidebar";
import Index from "./Pages/HomePageGrid";
import Search from "./Pages/Search";
import Explore from "./Pages/Expore";
import Reels from "./Pages/Reels";
import Messages from "./Pages/Message";
import Notifications from "./Pages/Notification";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import NotFound from "./Pages/NotFound";
import AuthLayout from "./components/AuthLayout";
import { socket } from "./utils/socket";
import UserProfile from "./Pages/Userprofile";
import { addNotification,setNotifications } from "./redux/slices/notificationSlice";
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
        })
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
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route
            path="/home"
            element={
              <MainLayout>
                <Index />
              </MainLayout>
            }
          />
          <Route
            path="/search"
            element={
              <MainLayout>
                <Search />
              </MainLayout>
            }
          />
          <Route
            path="/explore"
            element={
              <MainLayout>
                <Explore />
              </MainLayout>
            }
          />
          <Route
            path="/reels"
            element={
              <MainLayout>
                <Reels />
              </MainLayout>
            }
          />
          <Route
            path="/messages"
            element={
              <MainLayout>
                <Messages />
              </MainLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <MainLayout>
                <Notifications />
              </MainLayout>
            }
          />
          {/* <Route
            path="/profile"
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          /> */}
          <Route
  path="/profile"
  element={
    <MainLayout>
      <Profile  />
    </MainLayout>
  }
/>
<Route
  path="/otherprofile/:id"
  element={
    <MainLayout>
      <UserProfile /> 
    </MainLayout>
  }
/>

          <Route
            path="/settings"
            element={
              <MainLayout>
                <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
              </MainLayout>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
