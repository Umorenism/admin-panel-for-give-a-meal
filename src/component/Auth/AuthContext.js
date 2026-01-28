


import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: "", admin: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const storedAdmin = localStorage.getItem("admin");

        // Only parse if the string exists and isn't "undefined"
        if (token && storedAdmin && storedAdmin !== "undefined") {
          const admin = JSON.parse(storedAdmin);
          setAuth({ token, admin });
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        // Clear storage if data is corrupted
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // const login = (data) => {
  //   // Ensure we are getting the right keys from the API response
  //   const token = data.token;
  //   const admin = data.admin || data.user; // Flexibility for 'user' vs 'admin' keys

  //   localStorage.setItem("token", token);
  //   localStorage.setItem("admin", JSON.stringify(admin));
    
  //   setAuth({ token, admin });
  // };


  const login = (data) => {
  console.log("AuthContext.login called with:", data);

  let token = data.token;
  let admin = data.admin || data.user;

  if (!token) {
    console.warn("No token received in login()");
    return;
  }

  if (!admin || !admin.id) {
    console.warn("No valid admin/user object received:", admin);
    return;
  }

  // Normalize + clean
  const safeAdmin = {
    id: admin.id,
    email: admin.email,
    name: admin.name || "Admin",
    role: admin.role || "admin",
    profilePic: admin.profilePic || "",
  };

  localStorage.setItem("token", token);
  localStorage.setItem("admin", JSON.stringify(safeAdmin));

  console.log("AuthContext → saved & setting state:", { token, admin: safeAdmin });

  setAuth({ token, admin: safeAdmin });
};
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setAuth({ token: "", admin: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);