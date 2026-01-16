import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./Pages/SignupPage";
import Home from "./Pages/Home";
import RequireAuth from "./components/RequireAuth";
import AuthLayout from "./components/AuthLayout";
import Profile from "./Pages/Profile";
import Stories from "./Pages/Story";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />

      <Route
        path="/stories"
        element={
          <RequireAuth>
            <Stories />
          </RequireAuth>
        }
      />

      <Route
        path="/profile/:id?"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
