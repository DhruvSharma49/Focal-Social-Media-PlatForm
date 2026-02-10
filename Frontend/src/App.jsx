import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Sidebar from "./components/Sidebar";
import Index from "./Pages/Index";
import Search from "./Pages/Search";
import Explore from "./Pages/Expore";
import Reels from "./Pages/Reels";
import Messages from "./Pages/Message";
import Notifications from "./Pages/Notification";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import NotFound from "./Pages/NotFound";
import AuthLayout from "./components/Authlayout";


const queryClient = new QueryClient();

// Layout wrapper with optional sidebar
const MainLayout = ({ children, showSidebar = true }) => (
  <div className="min-h-screen bg-background flex">
    {showSidebar && <Sidebar />}
    <main className={`flex-1 ${showSidebar ? "ml-[72px] xl:ml-[244px]" : ""}`}>
      {children}
    </main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Main App routes */}
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
            <MainLayout showSidebar={false}>
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
        <Route
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
        />
        <Route
          path="/settings"
          element={
            <MainLayout>
         <Settings/>
            </MainLayout>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;


