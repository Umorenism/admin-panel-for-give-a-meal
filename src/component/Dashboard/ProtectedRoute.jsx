



import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Authenticating...</div>;
  }

  const token = auth?.token || localStorage.getItem("token");
  const adminRaw = auth?.admin || localStorage.getItem("admin");

  console.log("[ProtectedRoute] check →", {
    contextToken: !!auth?.token,
    lsToken: !!localStorage.getItem("token"),
    contextAdmin: !!auth?.admin,
    lsAdminRaw: adminRaw ? "present" : "missing",
    lsAdminParsed: adminRaw ? JSON.parse(adminRaw)?.id : null,
  });

  if (!token || !adminRaw) {
    console.warn("[ProtectedRoute] → redirecting to /login — missing token or admin");
    return <Navigate to="/login" replace />;
  }

  // Optional: try parse to catch corruption
  try {
    if (adminRaw && typeof adminRaw === "string") {
      JSON.parse(adminRaw);
    }
  } catch (e) {
    console.error("Corrupted admin in storage:", e);
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}