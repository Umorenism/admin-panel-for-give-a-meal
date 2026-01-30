
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaBell } from "react-icons/fa";
import { apiClient } from "../api/apiServices"; // ✅ use your configured axios instance

export default function ViewNotification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await apiClient.get("/api/admin/notifications");
        setNotifications(res.data.data || res.data);
        console.log("[ViewNotification] Fetched notifications:", res.data); // handle both formats
      } catch (err) {
        console.error("❌ Error fetching notifications:", err);
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const getTypeStyles = (type) => {
    switch (type) {
      case "info":
        return {
          icon: <FaInfoCircle className="text-blue-500" />,
          bg: "bg-blue-50",
          text: "text-blue-600",
        };
      case "warning":
        return {
          icon: <FaExclamationTriangle className="text-yellow-500" />,
          bg: "bg-yellow-50",
          text: "text-yellow-600",
        };
      case "success":
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          bg: "bg-green-50",
          text: "text-green-600",
        };
      case "urgent":
        return {
          icon: <FaBell className="text-red-500" />,
          bg: "bg-red-50",
          text: "text-red-600",
        };
      default:
        return {
          icon: <FaInfoCircle className="text-gray-400" />,
          bg: "bg-gray-50",
          text: "text-gray-600",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen dark:text-white dark:bg-gray-900 bg-gray-50 py-12 px-6"
    >
      <div className="max-w-5xl dark:text-white dark:bg-gray-900 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white dark:bg-gray-900">All Notifications</h1>
          <p className="text-gray-500 dark:text-white dark:bg-gray-900">View all alerts, updates, and system messages.</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading notifications...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : notifications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <FaBell className="text-5xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-white dark:bg-gray-900">No notifications found.</p>
          </div>
        ) : (
          <div className="grid dark:text-white dark:bg-gray-900 grid-cols-1 md:grid-cols-2 gap-6">
            {notifications.map((n) => {
              const { icon, bg, text } = getTypeStyles(n.type);
              return (
                <motion.div
                  key={n._id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-xl shadow-sm dark:text-white dark:bg-gray-900 border border-gray-200 ${bg} transition-all`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {icon}
                      <h2 className={`text-lg font-semibold ${text}`}>{n.title}</h2>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${text} bg-white/60`}>
                      {n.type?.toUpperCase() || "INFO"}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{n.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
