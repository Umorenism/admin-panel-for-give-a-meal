import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { getAdminProfile, updateAdminProfile } from "../api/apiServices"; // adjust path

export default function ProfileSettings() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    country: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch current profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAdminProfile();
        setProfile(data);
        setFormData({
          name: data.name || "",
          title: data.title || "", // assuming backend may return it
          country: data.country || "",
          profilePic: data.profilePic || "",
        });
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to load profile";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const updated = await updateAdminProfile(formData);
      // Update local state with fresh data
      setProfile(updated);
      toast.success("Profile updated successfully!");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update profile";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:text-white dark:bg-gray-900 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto dark:text-white dark:bg-gray-900">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl dark:text-white dark:bg-gray-900 font-bold text-gray-900 mb-2"
        >
          Profile Settings
        </motion.h1>
        <p className="text-gray-600  dark:text-white dark:bg-gray-900  mb-8">Manage your admin account details</p>

        {error && (
          <div className="mb-6 dark:text-white dark:bg-gray-900 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:text-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200"
        >
          {/* Header / Avatar */}
          <div className="bg-gradient-to-r from-orange-500 dark:text-white dark:bg-gray-900 to-orange-600 px-8 py-10 text-center text-white">
            <div className="mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
              {formData.profilePic ? (
                <img
                  src={formData.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/128?text=No+Photo";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-gray-400">
                  {profile?.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
              )}
            </div>
            <h2 className="mt-4 text-2xl font-semibold ">{profile?.name || "Admin"}</h2>
            <p className="text-orange-100 mt-1">{profile?.email}</p>
            <p className="text-sm mt-2 opacity-90">
              {profile?.role?.toUpperCase()} • Joined {new Date(profile?.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6 dark:text-white dark:bg-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 dark:text-white dark:bg-gray-900 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white dark:bg-gray-900">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full dark:text-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  required
                />
              </div>

              {/* Title / Position */}
              <div>
                <label className="block text-sm font-medium dark:text-white dark:bg-gray-900 text-gray-700 mb-1">Title / Position</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Program Director"
                  className="w-full dark:text-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white dark:bg-gray-900">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g. Nigeria"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              />
            </div>

            {/* Profile Picture URL */}
            <div>
              <label className="block text-sm font-medium dark:text-white dark:bg-gray-900 text-gray-700 mb-1">
                Profile Picture URL
              </label>
              <input
                type="url"
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
                placeholder="https://example.com/your-photo.jpg"
                className="w-full dark:text-white dark:bg-gray-900 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              />
              {formData.profilePic && (
                <p className="mt-2 text-sm text-gray-500">
                  Preview: <a href={formData.profilePic} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline dark:text-white dark:bg-gray-900">Open image</a>
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}