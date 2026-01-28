// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   getAllCampaigns,
//   getAnalytics,
//   toggleCampaignApproval,
// } from "../api/apiServices";

// export default function CampaignsPage() {
//   const [analytics, setAnalytics] = useState({
//     usersCount: 0,
//     donationsTotal: 0,
//     campaignsCount: 0,
//   });
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all"); // all | approved | unapproved

//   // Fetch analytics
//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const data = await getAnalytics();
//         setAnalytics(data);
//       } catch (err) {
//         console.error("Failed to load analytics:", err);
//       }
//     };
//     fetchAnalytics();
//   }, []);

//   // Fetch campaigns
//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         const data = await getAllCampaigns();
//         setCampaigns(data);
//       } catch (err) {
//         console.error("Failed to fetch campaigns:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCampaigns();
//   }, []);

//   // Toggle approval status
//   const handleToggleApproval = async (id) => {
//     try {
//       const { campaign } = await toggleCampaignApproval(id);
//       setCampaigns((prev) =>
//         prev.map((c) =>
//           c._id === id ? { ...c, isApproved: campaign.isApproved } : c
//         )
//       );
//     } catch (err) {
//       console.error("Error toggling approval:", err);
//     }
//   };

//   // Filter campaigns
//   const filtered = campaigns.filter((c) => {
//     if (filter === "approved") return c.isApproved === true;
//     if (filter === "unapproved") return c.isApproved === false;
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       {/* Header / Analytics */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white rounded-b-3xl shadow-lg">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
//           <h1 className="text-3xl md:text-4xl font-extrabold">
//             Campaign Management
//           </h1>
//           <div className="flex gap-6">
//             <div className="text-center">
//               <p className="text-sm opacity-80">Users</p>
//               <p className="text-xl md:text-2xl font-bold">{analytics.usersCount}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-sm opacity-80">Donations</p>
//               <p className="text-xl md:text-2xl font-bold">
//                 {analytics.donationsTotal}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-sm opacity-80">Campaigns</p>
//               <p className="text-xl md:text-2xl font-bold">
//                 {analytics.campaignsCount}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filter Buttons */}
//       <div className="max-w-6xl mx-auto px-4 mt-10 flex flex-wrap gap-3">
//         {["all", "approved", "unapproved"].map((type) => (
//           <button
//             key={type}
//             onClick={() => setFilter(type)}
//             className={`px-5 py-2 text-sm font-semibold rounded-xl shadow-md transition-colors ${
//               filter === type
//                 ? type === "approved"
//                   ? "bg-green-600 text-white"
//                   : type === "unapproved"
//                   ? "bg-red-600 text-white"
//                   : "bg-indigo-600 text-white"
//                 : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             {type.charAt(0).toUpperCase() + type.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Campaign Cards */}
//       <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {loading ? (
//           <p className="text-gray-600 col-span-3 text-center py-20">
//             Loading campaigns...
//           </p>
//         ) : filtered.length > 0 ? (
//           filtered.map((campaign) => (
//             <motion.div
//               key={campaign._id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
//             >
//               <img
//                 src={campaign.image}
//                 alt={campaign.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-5 flex flex-col gap-3">
//                 <h3 className="text-xl font-semibold">{campaign.title}</h3>
//                 <p className="text-gray-600 text-sm line-clamp-3">
//                   {campaign.description}
//                 </p>
//                 <div className="flex justify-between items-center mt-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       campaign.isApproved ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {campaign.isApproved ? "Approved" : "Unapproved"}
//                   </span>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={campaign.isApproved}
//                       onChange={() => handleToggleApproval(campaign._id)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
//                   </label>
//                 </div>
//                 <button className="mt-3 bg-indigo-600 text-white py-2 rounded-xl shadow hover:bg-indigo-700 transition">
//                   View Campaign
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-gray-600 col-span-3 text-center py-20">
//             No {filter} campaigns yet.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }







import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  getAllCampaigns,
  getApprovedCampaigns,     // we'll use this for approved filter
  toggleCampaignApproval,
  getAnalytics,
} from "../api/apiServices";

export default function CampaignsPage() {
  const [analytics, setAnalytics] = useState({
    usersCount: 0,
    donationsTotal: 0,
    campaignsCount: 0,
  });
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({}); // id → boolean
  const [filter, setFilter] = useState("all"); // "all" | "approved" | "unapproved"
  const [error, setError] = useState(null);

  // Fetch analytics
  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsData = await getAnalytics();
        setAnalytics(analyticsData);
      } catch (err) {
        console.error("Analytics fetch failed", err);
        toast.error("Failed to load dashboard stats");
      }
    };
    fetchData();
  }, []);

  // Fetch campaigns based on filter
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (filter === "approved") {
          data = await getApprovedCampaigns(); // /api/admin/campaigns/approved
        } else {
          data = await getAllCampaigns(); // /api/admin/campaigns/all
        }
        setCampaigns(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Campaigns fetch failed:", err);
        const msg = err.response?.data?.message || "Failed to load campaigns";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [filter]);

  const handleToggleApproval = async (campaignId) => {
    if (actionLoading[campaignId]) return;

    setActionLoading((prev) => ({ ...prev, [campaignId]: true }));

    try {
      const response = await toggleCampaignApproval(campaignId);
      // Assuming backend returns updated campaign or { campaign, msg }
      const updatedCampaign = response.campaign || response;

      setCampaigns((prev) =>
        prev.map((c) =>
          c._id === campaignId ? { ...c, isApproved: updatedCampaign.isApproved } : c
        )
      );

      toast.success(
        updatedCampaign.isApproved
          ? "Campaign approved successfully!"
          : "Campaign approval revoked"
      );
    } catch (err) {
      console.error("Toggle approval failed:", err);

      let msg = "Failed to update campaign status";
      if (err.response?.data?.msg?.includes("Cast to ObjectId failed")) {
        msg = "Invalid campaign ID format – please refresh the page";
      } else if (err.response?.data?.msg) {
        msg = err.response.data.msg;
      }

      toast.error(msg);
    } finally {
      setActionLoading((prev) => ({ ...prev, [campaignId]: false }));
    }
  };

  const filteredCampaigns = campaigns.filter((c) => {
    if (filter === "approved") return c.isApproved === true;
    if (filter === "unapproved") return c.isApproved === false;
    return true;
  });

  return (
    <div className="min-h-screen dark:text-white dark:bg-gray-900 bg-gray-50 text-gray-900 pb-12">
      {/* Header / Analytics */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white rounded-b-3xl shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <h1 className="text-3xl md:text-4xl font-extrabold">Campaign Management</h1>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-sm opacity-80">Users</p>
              <p className="text-2xl font-bold">{analytics.usersCount}</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-80">Total Donations</p>
              <p className="text-2xl font-bold">${analytics.donationsTotal?.toLocaleString() || 0}</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-80">Campaigns</p>
              <p className="text-2xl font-bold">{analytics.campaignsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="max-w-7xl dark:text-white dark:bg-gray-900 mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-wrap gap-3">
        {["all", "approved", "unapproved"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            disabled={loading}
            className={`px-6 py-2.5 text-sm font-medium rounded-full shadow transition-all ${
              filter === type
                ? type === "approved"
                  ? "bg-green-600 text-white"
                  : type === "unapproved"
                  ? "bg-red-600 text-white"
                  : "bg-indigo-600 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            } disabled:opacity-50`}
          >
            {type === "all" ? "All Campaigns" : type === "approved" ? "Approved" : "Pending"}
          </button>
        ))}
      </div>

      {/* Error / Loading / Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading campaigns...</div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No {filter === "all" ? "" : filter} campaigns found.
          </div>
        ) : (
          <div className="grid dark:text-white dark:bg-gray-900 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <motion.div
                key={campaign._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:text-white dark:border dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/400x200?text=No+Image")}
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold dark:text-white dark:bg-gray-900 line-clamp-2">{campaign.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 dark:text-white dark:bg-gray-900 line-clamp-3">{campaign.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.isApproved
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {campaign.isApproved ? "Approved" : "Pending Approval"}
                    </span>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={campaign.isApproved}
                        onChange={() => handleToggleApproval(campaign._id)}
                        disabled={actionLoading[campaign._id] || loading}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-gray-200 rounded-full peer 
                        ${actionLoading[campaign._id] ? "opacity-50 cursor-not-allowed" : ""}
                        peer-checked:bg-green-500 after:content-[''] after:absolute 
                        after:top-0.5 after:left-0.5 after:bg-white after:border 
                        after:rounded-full after:h-5 after:w-5 after:transition-all 
                        peer-checked:after:translate-x-5`}
                      ></div>
                    </label>
                  </div>

                  <div className="mt-4 text-sm text-gray-500 dark:text-white dark:bg-gray-900">
                    Donations: <strong>{campaign.totalDonations || 0}</strong>
                  </div>

                  <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}