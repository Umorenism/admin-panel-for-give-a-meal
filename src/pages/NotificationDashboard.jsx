import React from "react";
import { motion } from "framer-motion";
import { FaPlusCircle, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NotificationDashboard() {
  const navigate = useNavigate();

  const cards = [
  {
    title: "Create Notification",
    description:
      "Send an announcement, alert, or important message to users.",
    icon: <FaPlusCircle className="text-4xl text-indigo-500" />,
    bg: "from-indigo-500/10 to-indigo-100",
    route: "/dashboard/send-notifications", // ✅ FIXED
  },
  {
    title: "View Notifications",
    description: "See all notifications you've sent, edit or delete them.",
    icon: <FaBell className="text-4xl text-emerald-500" />,
    bg: "from-emerald-500/10 to-emerald-100",
    route: "/dashboard/view", // optional if you’ll add a view page later
  },
];


  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8"
    >
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Notification Management
        </h1>
        <p className="text-gray-500">
          Manage all system alerts, updates, and notifications in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(card.route)}
            className={`cursor-pointer bg-gradient-to-br ${card.bg} rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-gray-200 transition-all`}
          >
            <div className="flex flex-col items-center justify-center text-center h-full space-y-4">
              {card.icon}
              <h3 className="text-xl font-semibold text-gray-800">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
              <button className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Go →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
