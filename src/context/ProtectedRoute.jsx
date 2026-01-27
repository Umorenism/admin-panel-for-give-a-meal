




// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   console.log("ProtectedRoute user:", user, "loading:", loading); // Debug
//   if (loading) return <div>Loading...</div>; // Prevent redirect during load
//   return user ? children : <Navigate to="/login" replace />;
// }



import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  console.log("ProtectedRoute user:", user, "loading:", loading);

  if (loading) {
    return <div>Loading...</div>; // prevents redirect flicker
  }

  return user ? children : <Navigate to="/login" replace />;
}
