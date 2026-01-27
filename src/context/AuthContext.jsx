





// // import React, { createContext, useContext, useState, useEffect } from "react";

// // const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true); // Add loading state

// //   useEffect(() => {
// //     const initAuth = () => {
// //       const admin = localStorage.getItem("admin");
// //       if (admin) {
// //         setUser(JSON.parse(admin));
// //         console.log("Initial user from localStorage:", JSON.parse(admin)); // Debug
// //       }
// //       setLoading(false);
// //     };
// //     initAuth();
// //   }, []);

// //   const login = (data) => {
// //     console.log("Storing in AuthContext:", data);
// //     if (data.admin && data.access_token) {
// //       localStorage.setItem("admin", JSON.stringify(data.admin));
// //       localStorage.setItem("access_token", data.access_token);
// //       setUser(data.admin);
// //       console.log("User set in AuthContext:", data.admin);
// //     } else {
// //       console.error("Invalid login data:", data);
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem("admin");
// //     localStorage.removeItem("access_token");
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout, loading }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   return useContext(AuthContext);
// // }







// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initAuth = () => {
//       const admin = localStorage.getItem("admin");
//       if (admin) {
//         setUser(JSON.parse(admin));
//         console.log("Initial user from localStorage:", JSON.parse(admin));
//       }
//       setLoading(false);
//     };
//     initAuth();
//   }, []);

//   const login = (data) => {
//     console.log("Storing in AuthContext:", data);

//     if (data.access_token) {
//       localStorage.setItem("access_token", data.access_token);

//       // Use backend admin object if present, else fallback
//       const adminData =
//         data.admin || { email: data.email || "unknown", role: "admin" };

//       localStorage.setItem("admin", JSON.stringify(adminData));
//       setUser(adminData);

//       console.log("User set in AuthContext:", adminData);
//     } else {
//       console.error("Invalid login data:", data);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("admin");
//     localStorage.removeItem("access_token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }





import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        console.log("Initial user from localStorage:", JSON.parse(storedUser));
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = (data) => {
    console.log("Storing in AuthContext:", data);

    // ✅ Your backend: { user, token }
    if (data.user && data.token) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);

      console.log("User set in AuthContext:", data.user);
    } else {
      console.error("Invalid login data:", data);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
