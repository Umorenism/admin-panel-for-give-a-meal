// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { apiClient } from "../api/apiServices";
// import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaBell } from "react-icons/fa";
// import { toast } from "react-toastify";

// export default function Notification() {
//   const [formData, setFormData] = useState({
//     title: "",
//     message: "",
//     type: "info",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await apiClient.post("/api/admin/notifications", formData);
//       toast.success("Notification created successfully!");
//       setFormData({ title: "", message: "", type: "info" });
//       console.log(data)
//     } catch (error) {
//       console.error("Failed to create notification:", error);
//       toast.error("Failed to create notification.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const typeStyles = {
//     info: "bg-blue-100 border-blue-400 text-blue-700",
//     warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
//     success: "bg-green-100 border-green-400 text-green-700",
//     urgent: "bg-red-100 border-red-400 text-red-700",
//   };

//   const typeIcons = {
//     info: <FaInfoCircle className="text-blue-500 text-2xl" />,
//     warning: <FaExclamationTriangle className="text-yellow-500 text-2xl" />,
//     success: <FaCheckCircle className="text-green-500 text-2xl" />,
//     urgent: <FaBell className="text-red-500 text-2xl" />,
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="min-h-screen flex flex-col items-center justify-start p-8 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
//     >
//       <div className="w-full max-w-6xl  rounded-2xl p-8">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
//           <FaBell className="text-indigo-500" /> Create New Notification
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter notification title..."
//               required
//               className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
//             />
//           </div>

//           {/* Message */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Message
//             </label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Enter notification message..."
//               required
//               rows="4"
//               className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
//             />
//           </div>

//           {/* Notification Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Notification Type
//             </label>
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
//               {["info", "warning", "success", "urgent"].map((type) => (
//                 <div
//                   key={type}
//                   onClick={() => setFormData({ ...formData, type })}
//                   className={`flex items-center justify-center flex-col gap-2 border rounded-xl py-3 cursor-pointer transition-all duration-300 ${
//                     formData.type === type
//                       ? `ring-2 ring-offset-2 ring-${type === "urgent" ? "red" : type}-400`
//                       : "opacity-70 hover:opacity-100"
//                   } ${typeStyles[type]}`}
//                 >
//                   {typeIcons[type]}
//                   <span className="capitalize font-semibold">{type}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Preview */}
//           <div className={`border-l-4 p-4 rounded-lg ${typeStyles[formData.type]}`}>
//             <p className="font-semibold">{formData.title || "Notification Title"}</p>
//             <p className="text-sm">{formData.message || "Your message will appear here..."}</p>
//           </div>

//           {/* Submit */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             disabled={loading}
//             className="w-full bg-orange-600 hover:bg-orange-300 text-white py-3 rounded-lg text-lg font-semibold shadow-lg transition-all"
//           >
//             {loading ? "Sending..." : "Send Notification"}
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   );
// }




// // import { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import { toast, Toaster } from "react-hot-toast";
// // import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaBell } from "react-icons/fa";
// // import { apiClient } from "../api/apiServices";

// // export default function NotificationPage() {
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     message: "",
// //     type: "info",
// //   });
// //   const [notifications, setNotifications] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [fetching, setFetching] = useState(true);

// //   // Fetch all notifications on mount
// //   useEffect(() => {
// //     const fetchNotifications = async () => {
// //       try {
// //         const res = await apiClient.get("/api/admin/notifications");
// //         setNotifications(res.data || []);
// //       } catch (err) {
// //         console.error("Failed to load notifications:", err);
// //         toast.error("Could not load existing notifications");
// //       } finally {
// //         setFetching(false);
// //       }
// //     };
// //     fetchNotifications();
// //   }, []);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       await apiClient.post("/api/admin/notifications", formData);
// //       toast.success("Notification created!");

// //       // Refresh list
// //       const res = await apiClient.get("/api/admin/notifications");
// //       setNotifications(res.data || []);

// //       setFormData({ title: "", message: "", type: "info" });
// //     } catch (error) {
// //       const msg = error.response?.data?.msg || error.response?.data?.message || "Failed to create notification";
// //       console.error("Create notification error:", error);
// //       toast.error(msg);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const typeStyles = {
// //     info: "bg-blue-50 border-blue-400 text-blue-800",
// //     warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
// //     success: "bg-green-50 border-green-400 text-green-800",
// //     urgent: "bg-red-50 border-red-400 text-red-800",
// //   };

// //   const typeIcons = {
// //     info: <FaInfoCircle className="text-blue-600 text-2xl" />,
// //     warning: <FaExclamationTriangle className="text-yellow-600 text-2xl" />,
// //     success: <FaCheckCircle className="text-green-600 text-2xl" />,
// //     urgent: <FaBell className="text-red-600 text-2xl" />,
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 px-6 py-10">
// //       <Toaster position="top-right" />

// //       <div className="max-w-4xl mx-auto space-y-10">
// //         {/* Create Form */}
// //         <motion.section
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
// //         >
// //           <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
// //             <FaBell className="text-orange-600" /> Create Notification
// //           </h2>

// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
// //               <input
// //                 type="text"
// //                 name="title"
// //                 value={formData.title}
// //                 onChange={handleChange}
// //                 placeholder="System Maintenance"
// //                 required
// //                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
// //               <textarea
// //                 name="message"
// //                 value={formData.message}
// //                 onChange={handleChange}
// //                 placeholder="The system will be down for maintenance at midnight..."
// //                 required
// //                 rows={4}
// //                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
// //               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
// //                 {["info", "warning", "success", "urgent"].map((t) => (
// //                   <button
// //                     key={t}
// //                     type="button"
// //                     onClick={() => setFormData({ ...formData, type: t })}
// //                     className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
// //                       formData.type === t
// //                         ? "ring-2 ring-orange-500 shadow-sm"
// //                         : "hover:bg-gray-50"
// //                     } ${typeStyles[t]}`}
// //                   >
// //                     {typeIcons[t]}
// //                     <span className="mt-2 font-medium capitalize">{t}</span>
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Live Preview */}
// //             {formData.title || formData.message ? (
// //               <div className={`p-4 rounded-xl border-l-4 ${typeStyles[formData.type]}`}>
// //                 <p className="font-semibold">{formData.title || "Title preview"}</p>
// //                 <p className="text-sm mt-1">{formData.message || "Message preview..."}</p>
// //               </div>
// //             ) : null}

// //             <motion.button
// //               type="submit"
// //               disabled={loading}
// //               whileHover={{ scale: 1.02 }}
// //               whileTap={{ scale: 0.98 }}
// //               className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 disabled:opacity-60 flex items-center justify-center gap-2"
// //             >
// //               {loading ? (
// //                 <>
// //                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //                   Sending...
// //                 </>
// //               ) : (
// //                 "Send Notification"
// //               )}
// //             </motion.button>
// //           </form>
// //         </motion.section>

// //         {/* List of Notifications */}
// //         <motion.section
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.2 }}
// //           className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
// //         >
// //           <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
// //             <FaBell className="text-orange-600" /> Sent Notifications
// //           </h2>

// //           {fetching ? (
// //             <p className="text-gray-500">Loading notifications...</p>
// //           ) : notifications.length === 0 ? (
// //             <p className="text-gray-500 text-center py-8">No notifications yet.</p>
// //           ) : (
// //             <div className="space-y-4">
// //               {notifications.map((notif) => (
// //                 <div
// //                   key={notif._id}
// //                   className={`p-4 rounded-xl border-l-4 ${typeStyles[notif.type] || "border-gray-300"} bg-gray-50`}
// //                 >
// //                   <div className="flex items-start gap-3">
// //                     {typeIcons[notif.type] || <FaBell className="text-gray-500 text-xl mt-1" />}
// //                     <div className="flex-1">
// //                       <h3 className="font-semibold text-gray-800">{notif.title}</h3>
// //                       <p className="text-sm text-gray-700 mt-1">{notif.message}</p>
// //                       <div className="text-xs text-gray-500 mt-2 flex items-center gap-3">
// //                         <span>By: {notif.createdBy?.name || "System"}</span>
// //                         <span>•</span>
// //                         <span>{new Date(notif.createdAt).toLocaleString()}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </motion.section>
// //       </div>
// //     </div>
// //   );
// // }








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

  // Fetch all notifications on mount
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getNotifications();
        setNotifications(res || []);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        toast.error("Could not load notifications");
      } finally {
        setFetching(false);
      }
    };
    fetchAll();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createNotification(formData);
      toast.success("Notification created successfully!");
      setFormData({ title: "", message: "", type: "info" });

      // Refresh notifications list
      const all = await getNotifications();
      setNotifications(all || []);
    } catch (error) {
      const msg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to create notification. Make sure you are logged in as admin.";
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
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Create Notification Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaBell className="text-orange-600" /> Create Notification
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="System Maintenance"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="The system will be down for maintenance at midnight..."
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["info", "warning", "success", "urgent"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: t })}
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

            {/* Live Preview */}
            {formData.title || formData.message ? (
              <div className={`p-4 rounded-xl border-l-4 ${typeStyles[formData.type]}`}>
                <p className="font-semibold">{formData.title || "Title preview"}</p>
                <p className="text-sm mt-1">{formData.message || "Message preview..."}</p>
              </div>
            ) : null}

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

        {/* List of Notifications */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaBell className="text-orange-600" /> Sent Notifications
          </h2>

          {fetching ? (
            <p className="text-gray-500">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No notifications yet.</p>
          ) : (
            <div className="space-y-4">
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
                      <div className="text-xs text-gray-500 mt-2 flex items-center gap-3">
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
