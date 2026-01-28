



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { loginAdmin } from "../../api/apiServices";
// import { useAuth } from "../../context/AuthContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import toast, { Toaster } from "react-hot-toast";
// import loginBg from "../../assets/ngo.jpg";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { auth, login } = useAuth();

//   // Redirect if already logged in
//   useEffect(() => {
//     if (auth?.token && auth?.admin) {
//       navigate("/dashboard", { replace: true });
//     }
//   }, [auth, navigate]);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError("");

//   //   try {
//   //     const { user, token } = await loginAdmin({ email, password });

//   //     if (!token || !user) throw new Error("Invalid credentials");

//   //     login({ token, admin: user }); // ✅ updates context and localStorage

//   //     toast.success("Login successful!");
//   //     // ❌ Do NOT navigate here — useEffect handles it
//   //   } catch (err) {
//   //     const msg =
//   //       err.response?.data?.message ||
//   //       err.response?.data?.msg ||
//   //       err.message ||
//   //       "Invalid credentials or server error.";
//   //     setError(msg);
//   //     toast.error(msg);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


// //  const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   setLoading(true);

// //   try {
// //     const { user, token } = await loginAdmin({ email, password });

// //     if (!token || !user) throw new Error("Invalid response from server");

// //     // 1. Set context (and localStorage via your login function)
// //     login({ token, admin: user });

// //     toast.success("Login successful!");

// //     // 2. Navigate immediately. 
// //     // Because ProtectedRoute now checks localStorage, it won't kick you back.
// //     navigate("/dashboard", { replace: true });

// //   } catch (err) {
// //     const msg = err.response?.data?.message || "Login failed";
// //     toast.error(msg);
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError(""); // if you still have error state

//   try {
//     const response = await loginAdmin({ email, password });
//     const { user, token } = response; // loginAdmin already returns {user, token}

//     console.log("API success → raw data:", { user, token });

//     if (!token || !user?.id) {
//       throw new Error("Missing token or user ID from server");
//     }

//     // Explicitly normalize the admin object
//     const adminData = {
//       id: user.id,
//       email: user.email,
//       name: user.name,
//       role: user.role,
//       profilePic: user.profilePic || "",
//     };

//     // 1. Save to storage FIRST
//     localStorage.setItem("token", token);
//     localStorage.setItem("admin", JSON.stringify(adminData));

//     console.log("Saved to localStorage → now reading back:", {
//       tokenBack: localStorage.getItem("token"),
//       adminBack: localStorage.getItem("admin"),
//     });

//     // 2. Then update context
//     login({ token, admin: adminData });

//     toast.success("Login successful!");

//     // Small delay → gives React time to propagate state + storage events
//     setTimeout(() => {
//       console.log("Navigating after delay — current auth:", useAuth().auth);
//       navigate("/dashboard", { replace: true });
//     }, 400);

//   } catch (err) {
//     console.error("Login error:", err);
//     const msg =
//       err.response?.data?.message ||
//       err.response?.data?.error ||
//       err.message ||
//       "Login failed – please check credentials or network";
//     setError(msg);
//     toast.error(msg);
//   } finally {
//     setLoading(false);
//   }
// };
//   return (
//     <motion.div
//       className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
//       style={{ backgroundImage: `url(${loginBg})` }}
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <Toaster position="top-center" />

//       {error && (
//         <motion.div
//           className="absolute top-10 bg-red-100 border border-red-500 text-red-700 px-6 py-3 rounded-md shadow-md z-50"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//         >
//           {error}
//         </motion.div>
//       )}

//       <motion.div
//         className="w-full max-w-md p-8 bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-xl space-y-8 border border-gray-700/50"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//       >
//         <div className="text-center">
//           <h1 className="text-orange-500 font-black text-4xl">GIVE A MEAL</h1>
//           <h2 className="text-2xl font-bold text-white mt-3">Admin Login</h2>
//           <p className="text-sm text-gray-300 mt-2">Secure access to dashboard</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-200">Email</label>
//             <input
//               type="email"
//               placeholder="admin@theinnercitymission.net"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               required
//             />
//           </div>

//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-200">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-12"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-10 text-gray-400 hover:text-white"
//             >
//               {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//             </button>
//           </div>

//           <motion.button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {loading ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               "Sign In"
//             )}
//           </motion.button>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// }




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginAdmin } from "../../api/apiServices";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import loginBg from "../../assets/ngo.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { auth, login } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (auth?.token && auth?.admin) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call the login API function
      const { user, token } = await loginAdmin({ email, password });

      // Safety check
      if (!token || !user?.id) {
        throw new Error("Invalid response from server – missing token or user data");
      }

      // Update auth context (this also saves to localStorage)
      login({ token, admin: user });

      toast.success("Login successful!");

      // Small delay helps avoid race conditions with ProtectedRoute
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 300);

    } catch (err) {
      console.error("Login error:", err);

      let errorMessage = "Login failed. Please try again.";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster position="top-center" />

      {error && (
        <motion.div
          className="absolute top-10 bg-red-100 border border-red-500 text-red-700 px-6 py-3 rounded-md shadow-md z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {error}
        </motion.div>
      )}

      <motion.div
        className="w-full max-w-md p-8 bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-xl space-y-8 border border-gray-700/50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center">
          <h1 className="text-orange-500 font-black text-4xl">GIVE A MEAL</h1>
          <h2 className="text-2xl font-bold text-white mt-3">Admin Login</h2>
          <p className="text-sm text-gray-300 mt-2">Secure access to dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200">Email</label>
            <input
              type="email"
              placeholder="admin@theinnercitymission.net"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-200">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-12"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}