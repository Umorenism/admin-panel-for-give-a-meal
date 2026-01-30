




import { useState } from "react";
import { motion } from "framer-motion";
import { registerAdmin } from "../api/apiServices";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentlyCreatedAdmins, setRecentlyCreatedAdmins] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call the correct endpoint with role explicitly set
      const createdAdmin = await registerAdmin({
        name,
        email,
        password,
        profilePic: profilePic || undefined,
        role: "admin", // required by your backend spec
      });

      // Use returned data or fallback to form values
      const newAdmin = {
        name: createdAdmin.name || name,
        email: createdAdmin.email || email,
        profilePic: createdAdmin.profilePic || profilePic || null,
        createdAt: createdAdmin.createdAt || new Date().toISOString(),
        role: createdAdmin.role || "admin",
        _id: createdAdmin._id || "temp-" + Date.now(),
      };

      setRecentlyCreatedAdmins((prev) => [newAdmin, ...prev]);

      toast.success("New admin registered successfully!");
      
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setProfilePic("");
      setShowPassword(false);

    } catch (err) {
      // Show exact backend message (very helpful for debugging)
      const msg = err.response?.data?.msg || 
                  err.response?.data?.message || 
                  "Failed to register admin. Make sure you're logged in as an admin.";
      setError(msg);
      toast.error(msg);
      console.error("[Register Admin Error]", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:text-white dark:bg-gray-900 bg-gray-50 px-6 py-10">
      <Toaster position="top-right" richColors />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-white dark:bg-gray-900">Admin Settings</h1>
        <p className="text-gray-600 dark:text-white dark:bg-gray-900 mb-2">
          Register new administrators (requires super admin privileges)
        </p>

        {/* Quick note if something goes wrong */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-sm dark:text-white dark:bg-gray-900">
          <strong>Important:</strong> You must be logged in as an existing admin (e.g. giveameal@theinnercitymission.net) to use this form.
        </div>

        {/* Registration Form */}
        <motion.div
          className="bg-white dark:text-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-2xl dark:text-white dark:bg-gray-900 font-semibold text-gray-800 mb-6">
            Register New Administrator
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 dark:text-white dark:bg-gray-900 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 dark:text-white dark:bg-gray-900">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white dark:bg-gray-900">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full dark:text-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-white dark:bg-gray-900 text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="newadmin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full dark:text-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                required
              />
            </div>

            <div className="relative">
              <label className="block dark:text-white dark:bg-gray-900 text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Strong password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full dark:text-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <div>
              <label className="block dark:text-white dark:bg-gray-900 text-sm font-medium text-gray-700 mb-1">
                Profile Picture URL (optional)
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              />
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
                  Creating admin...
                </>
              ) : (
                "Create Admin"
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Recently Created Admins */}
        {recentlyCreatedAdmins.length > 0 && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Recently Registered Admins
            </h2>

            <div className="space-y-4">
              {recentlyCreatedAdmins.map((admin, index) => (
                <motion.div
                  key={admin._id || index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                    {admin.profilePic ? (
                      <img
                        src={admin.profilePic}
                        alt={admin.name}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/56?text=No+Photo")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl font-bold">
                        {admin.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{admin.name}</h3>
                    <p className="text-sm text-gray-600">{admin.email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(admin.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-sm text-green-600 font-medium">Admin</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}