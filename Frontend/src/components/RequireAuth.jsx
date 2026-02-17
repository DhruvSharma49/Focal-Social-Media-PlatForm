import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (authentication && !isAuth) {
      // Protected page but not logged-in
      navigate("/login");
    } else if (!authentication && isAuth) {
      // Public page but already logged-in
      navigate("/home");
    }
    setLoading(false);
  }, [isAuth, navigate, authentication]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}
