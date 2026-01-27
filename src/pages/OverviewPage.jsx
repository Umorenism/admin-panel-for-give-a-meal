


// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { getUserCount, getTotalDonation, getAnalytics } from "../api/apiServices";
// import { FaUsers, FaDonate, FaBullhorn, FaArrowUp, FaArrowDown } from "react-icons/fa";
// import { Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

// export default function OverviewPage() {
//   const [count, setCount] = useState(0);
//   const [donation, setDonation] = useState({ total: 0 });
//   const [analytics, setAnalytics] = useState({
//     campaignsCount: 0,
//     active: 0,
//     completed: 0,
//     upcoming: 0,
//     recentDonations: [],
//     paymentMethodTotals: { paystack: 0, stripe: 0, espee: 0 },
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         console.error("❌ No token found. Please login as admin.");
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       try {
//         const [c, d, a] = await Promise.all([
//           getUserCount(),
//           getTotalDonation(),
//           getAnalytics(),
//         ]);

//         setCount(c?.count ?? 0);
//         setDonation(d ?? { total: 0 });
//         setAnalytics({
//           campaignsCount: a.campaignsCount ?? 0,
//           active: a.active ?? 0,
//           completed: a.completed ?? 0,
//           upcoming: a.upcoming ?? 0,
//           recentDonations: a.recentDonations ?? [],
//           paymentMethodTotals: a.paymentMethodTotals ?? { paystack: 0, stripe: 0, espee: 0 },
//         });
//       } catch (err) {
//         console.error("OverviewPage load error:", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   return (
//     <motion.div
//       className="p-6 space-y-8"
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="border text-black rounded-xl p-8 shadow-lg">
//         <h1 className="text-3xl font-bold">Welcome back, Admin 🎉</h1>
//         <p className="opacity-90 mt-2">Here’s a quick glance at how your platform is performing today.</p>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {/* Top Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Total Users */}
//             <motion.div whileHover={{ scale: 1.03 }} className="p-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm opacity-80">Total Users</p>
//                   <p className="text-3xl font-bold">{count}</p>
//                 </div>
//                 <FaUsers size={36} />
//               </div>
//               <p className="mt-3 text-green-300 flex items-center gap-1 text-sm">
//                 <FaArrowUp /> +12% this month
//               </p>
//             </motion.div>

//             {/* Total Donations */}
//             <motion.div whileHover={{ scale: 1.03 }} className="p-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm opacity-80">Total Donations</p>
//                   <p className="text-3xl font-bold">${donation?.total ?? 0}</p>
//                 </div>
//                 <FaDonate size={36} />
//               </div>
//               <p className="mt-3 text-red-300 flex items-center gap-1 text-sm">
//                 <FaArrowDown /> -5% this week
//               </p>
//             </motion.div>

//             {/* Active Campaigns */}
//             <motion.div whileHover={{ scale: 1.03 }} className="p-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm opacity-80">Active Campaigns</p>
//                   <p className="text-3xl font-bold">{analytics?.campaignsCount ?? 0}</p>
//                 </div>
//                 <FaBullhorn size={36} />
//               </div>
//               <p className="mt-3 text-green-300 flex items-center gap-1 text-sm">
//                 <FaArrowUp /> +3 new this week
//               </p>
//             </motion.div>
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
//             {/* Donation Growth */}
//             <div className="bg-white p-6 rounded-xl shadow-lg">
//               <h3 className="text-lg font-semibold mb-4 text-gray-700">Donation Growth</h3>
//               <Line
//                 data={{
//                   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//                   datasets: [{
//                     label: "Donations ($)",
//                     data: [1200, 1900, 3000, 2500, 4000, 4700],
//                     borderColor: "#f97316",
//                     backgroundColor: "rgba(249,115,22,0.3)",
//                     tension: 0.4,
//                     fill: true,
//                     pointBackgroundColor: "#f97316",
//                   }],
//                 }}
//                 options={{
//                   plugins: { legend: { labels: { color: "#374151" } } },
//                   scales: { x: { ticks: { color: "#374151" } }, y: { ticks: { color: "#374151" } } }
//                 }}
//               />
//             </div>

//             {/* Campaign Status */}
//             <div className="bg-white p-6 rounded-xl shadow-lg">
//               <h3 className="text-lg font-semibold mb-4 text-gray-700">Campaigns Status</h3>
//               <Pie
//                 data={{
//                   labels: ["Active", "Completed", "Upcoming"],
//                   datasets: [{
//                     data: [analytics?.active ?? 0, analytics?.completed ?? 0, analytics?.upcoming ?? 0],
//                     backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
//                     borderWidth: 2,
//                   }],
//                 }}
//                 options={{ plugins: { legend: { labels: { color: "#374151" } } } }}
//               />
//             </div>
//           </div>

//           {/* Recent Donations */}
//           {/* <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
//             <h3 className="text-lg text-gray-700 font-semibold mb-4">Recent Donations</h3>
//             <ul className="divide-y">
//               {(analytics?.recentDonations?.length ? analytics.recentDonations : [
//                 { name: "John Doe", amount: 120, date: "2025-09-21" },
//                 { name: "Jane Smith", amount: 250, date: "2025-09-20" },
//                 { name: "Alex Kim", amount: 180, date: "2025-09-18" },
//               ]).map((donation, i) => (
//                 <li key={i} className="flex justify-between items-center py-3">
//                   <span className="font-medium text-gray-600">{donation.name}</span>
//                   <span className="text-green-600 font-semibold">${donation.amount}</span>
//                   <span className="text-gray-500 text-sm">{donation.date}</span>
//                 </li>
//               ))}
//             </ul>
//           </div> */}
//         </>
//       )}
//     </motion.div>
//   );
// }




// import { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import { getUserCount, getTotalDonation, getAnalytics } from "../api/apiServices";
// import { FaUsers, FaDonate, FaBullhorn, FaArrowUp } from "react-icons/fa";
// import { Bar, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// export default function OverviewPage() {
//   const [users, setUsers] = useState(0);
//   const [donations, setDonations] = useState(0);
//   const [analytics, setAnalytics] = useState({
//     campaignsCount: 0,
//     active: 0,
//     completed: 0,
//     upcoming: 0,
//     paymentMethodTotals: { paystack: 0, stripe: 0, espee: 0 },
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const [u, d, a] = await Promise.all([
//           getUserCount(),
//           getTotalDonation(),
//           getAnalytics(),
//         ]);

//         setUsers(u?.count || 0);
//         setDonations(d?.total || 0);
//         setAnalytics((prev) => ({ ...prev, ...a }));
//       } catch (e) {
//         console.error("Dashboard load error", e);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const donationBarData = useMemo(() => ({
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Donations ($)",
//         data: [1200, 1900, 3000, 2500, 4200, donations || 4800],
//         backgroundColor: "rgba(16,185,129,0.8)",
//         borderRadius: 10,
//       },
//     ],
//   }), [donations]);

//   const campaignDoughnut = useMemo(() => ({
//     labels: ["Active", "Completed", "Upcoming"],
//     datasets: [
//       {
//         data: [analytics.active, analytics.completed, analytics.upcoming],
//         backgroundColor: ["#2563eb", "#10b981", "#f59e0b"],
//         borderWidth: 0,
//       },
//     ],
//   }), [analytics]);

//   if (loading) {
//     return <p className="p-6">Loading dashboard…</p>;
//   }

//   return (
//     <motion.div
//       className="p-6 space-y-8"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
//         <h1 className="text-3xl font-bold">NGO Admin Dashboard</h1>
//         <p className="opacity-90 mt-2">Monitor impact, donations, and campaigns in real time.</p>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard title="Total Users" value={users} icon={<FaUsers />} trend="+12%" />
//         <StatCard title="Total Donations" value={`$${donations}`} icon={<FaDonate />} trend="+8%" />
//         <StatCard title="Campaigns" value={analytics.campaignsCount} icon={<FaBullhorn />} trend="+3" />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
//           <h3 className="font-semibold text-gray-700 mb-4">Donation Trends (6 Months)</h3>
//           <Bar data={donationBarData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-lg">
//           <h3 className="font-semibold text-gray-700 mb-4">Campaign Status</h3>
//           <Doughnut data={campaignDoughnut} options={{ cutout: "70%" }} />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function StatCard({ title, value, icon, trend }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.04 }}
//       className="bg-white rounded-2xl p-6 shadow-md border"
//     >
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="text-sm text-gray-500">{title}</p>
//           <p className="text-3xl font-bold text-gray-800">{value}</p>
//         </div>
//         <div className="text-indigo-600 text-3xl">{icon}</div>
//       </div>
//       <p className="mt-3 text-green-600 text-sm flex items-center gap-1">
//         <FaArrowUp /> {trend}
//       </p>
//     </motion.div>
//   );
// }




import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  getUserCount,
  getTotalDonation,
  getAnalytics,
} from "../api/apiServices";
import {
  FaUsers,
  FaDonate,
  FaBullhorn,
  FaArrowUp,
} from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function OverviewPage() {
  const [users, setUsers] = useState(0);
  const [donations, setDonations] = useState(0);
  const [analytics, setAnalytics] = useState({
    campaignsCount: 0,
    active: 0,
    completed: 0,
    upcoming: 0,
    monthlyDonations: [],
    paymentMethodTotals: {
      paystack: 0,
      stripe: 0,
      espee: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const [u, d, a] = await Promise.all([
          getUserCount(),
          getTotalDonation(),
          getAnalytics(),
        ]);

        setUsers(u?.count ?? 0);
        setDonations(d?.total ?? 0);

        setAnalytics((prev) => ({
          ...prev,
          ...a,
        }));
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /**
   * -----------------------------
   * Donation Trend (Bar Chart)
   * -----------------------------
   * Expected analytics.monthlyDonations format:
   * [{ month: "Jan", total: 1200 }, ...]
   */
  const donationBarData = useMemo(() => {
    const monthly = analytics.monthlyDonations || [];

    return {
      labels: monthly.length
        ? monthly.map((m) => m.month)
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Donations ($)",
          data: monthly.length
            ? monthly.map((m) => m.total)
            : [1200, 1900, 3000, 2500, 4200, donations],
          backgroundColor: "rgba(16,185,129,0.85)",
          borderRadius: 10,
        },
      ],
    };
  }, [analytics.monthlyDonations, donations]);

  /**
   * -----------------------------
   * Campaign Status (Doughnut)
   * -----------------------------
   */
  const campaignDoughnut = useMemo(() => ({
    labels: ["Active", "Completed", "Upcoming"],
    datasets: [
      {
        data: [
          analytics.active || 0,
          analytics.completed || 0,
          analytics.upcoming || 0,
        ],
        backgroundColor: ["#2563eb", "#10b981", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  }), [analytics]);

  if (loading) {
    return <p className="p-6">Loading dashboard…</p>;
  }

  return (
    <motion.div
      className="p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold">NGO Admin Dashboard</h1>
        <p className="opacity-90 mt-2">
          Monitor impact, donations, and campaigns in real time.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={users}
          icon={<FaUsers />}
          trend="+12%"
        />
        <StatCard
          title="Total Donations"
          value={`$${donations}`}
          icon={<FaDonate />}
          trend="+8%"
        />
        <StatCard
          title="Campaigns"
          value={analytics.campaignsCount}
          icon={<FaBullhorn />}
          trend="+3"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-gray-700 mb-4">
            Donation Trends (Monthly)
          </h3>
          <Bar
            data={donationBarData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { mode: "index", intersect: false },
              },
            }}
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-gray-700 mb-4">
            Campaign Status
          </h3>
          <Doughnut
            data={campaignDoughnut}
            options={{
              cutout: "70%",
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white rounded-2xl p-6 shadow-md border"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className="text-indigo-600 text-3xl">{icon}</div>
      </div>
      <p className="mt-3 text-green-600 text-sm flex items-center gap-1">
        <FaArrowUp /> {trend}
      </p>
    </motion.div>
  );
}
