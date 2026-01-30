import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaBell } from "react-icons/fa";
import { createNotification, getNotifications } from "../api/apiServices";

export default function NotificationPage() {
  

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
  });
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [fetching, setFetching] = useState(true);

  

  // Fetch notifications
  useEffect(() => {
    const fetchAll = async () => {
      setFetching(true);
      try {
        const data = await getNotifications();
        setNotifications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        const msg = err.response?.data?.msg || "Could not load notifications";
        toast.error(msg);
      } finally {
        setFetching(false);
      }
    };

    fetchAll();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createNotification(formData);

      toast.success("Notification sent successfully!");

      // Reset form
      setFormData({ title: "", message: "", type: "info" });

      // Refresh list
      const updated = await getNotifications();
      setNotifications(Array.isArray(updated) ? updated : []);
    } catch (error) {
      const msg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to create notification";
      toast.error(msg);
      console.error("[Notification Error]", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const typeStyles = {
    info: "bg-blue-50 border-blue-400 text-blue-800",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
    success: "bg-green-50 border-green-400 text-green-800",
    urgent: "bg-red-50 border-red-400 text-red-800",
  };

  const typeIcons = {
    info: <FaInfoCircle className="text-blue-600 text-2xl" />,
    warning: <FaExclamationTriangle className="text-yellow-600 text-2xl" />,
    success: <FaCheckCircle className="text-green-600 text-2xl" />,
    urgent: <FaBell className="text-red-600 text-2xl" />,
  };

  return (
    <div className="min-h-screen dark:text-white dark:bg-gray-900 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Create Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:text-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200"
        >
          <h2 className="text-2xl dark:text-white dark:bg-gray-900 font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaBell className="text-orange-600" /> Create Notification
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block dark:text-white dark:bg-gray-900 text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. System Maintenance Notice"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white dark:bg-gray-900">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Detailed message here..."
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white dark:bg-gray-900">Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["info", "warning", "success", "urgent"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type: t }))}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                      formData.type === t ? "ring-2 ring-orange-500 shadow-sm" : "hover:bg-gray-50"
                    } ${typeStyles[t]}`}
                  >
                    {typeIcons[t]}
                    <span className="mt-2 font-medium capitalize">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live preview */}
            {(formData.title.trim() || formData.message.trim()) && (
              <div className={`p-4 rounded-xl border-l-4 ${typeStyles[formData.type]}`}>
                <p className="font-semibold">{formData.title || "Title preview"}</p>
                <p className="text-sm mt-1">{formData.message || "Message preview..."}</p>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Notification"
              )}
            </motion.button>
          </form>
        </motion.section>

        {/* Notifications List */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:text-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaBell className="text-orange-600 dark:text-white dark:bg-gray-900" /> Sent Notifications
          </h2>

          {fetching ? (
            <p className="text-gray-500 text-center py-8 dark:text-white dark:bg-gray-900">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-8 dark:text-white dark:bg-gray-900">No notifications sent yet.</p>
          ) : (
            <div className="space-y-4 dark:text-white dark:bg-gray-900">
              {notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`p-4 rounded-xl border-l-4 ${
                    typeStyles[notif.type] || "border-gray-300"
                  } bg-gray-50`}
                >
                  <div className="flex items-start gap-3">
                    {typeIcons[notif.type] || <FaBell className="text-gray-500 text-xl mt-1" />}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{notif.title}</h3>
                      <p className="text-sm text-gray-700 mt-1">{notif.message}</p>
                      <div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-3">
                        <span>By: {notif.createdBy?.name || "System"}</span>
                        <span>•</span>
                        <span>{new Date(notif.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}