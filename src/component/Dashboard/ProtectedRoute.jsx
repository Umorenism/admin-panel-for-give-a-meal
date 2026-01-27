

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function ProtectedRoute({ children }) {
  const { auth, loading } = useAuth();
  
  // Check localStorage directly as a backup to the Context state
  const hasToken = auth?.token || localStorage.getItem("token");
  const hasAdmin = auth?.admin || localStorage.getItem("admin");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // If we don't have a token/admin in state OR localStorage, redirect
  if (!hasToken || !hasAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}