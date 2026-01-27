// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { getAnalytics } from "../api/apiServices";
// import { Users, HeartHandshake, BarChart3, CreditCard } from "lucide-react";

// function StatCard({ icon: Icon, label, value, description, color, delay = 0 }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay }}
//       className={`rounded-2xl p-6 shadow-lg bg-gradient-to-br ${color.gradient} text-white`}
//     >
//       <div className="flex items-center gap-4">
//         <div className="p-4 rounded-full bg-white/20">
//           <Icon className="w-7 h-7" />
//         </div>
//         <div>
//           <p className="text-sm opacity-80">{label}</p>
//           <p className="text-3xl font-extrabold tracking-wide">
//             {value !== null && value !== undefined
//               ? new Intl.NumberFormat().format(value)
//               : "-"}
//           </p>
//         </div>
//       </div>
//       <p className="mt-4 text-sm opacity-90 leading-snug">{description}</p>
//     </motion.div>
//   );
// }

// export default function AnalyticsPage() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getAnalytics();
//         setData(res);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load analytics. Please try again.");
//       }
//     })();
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gray-50 p-8"
//     >
//       {/* Header */}
//       <div className="mb-10 text-center">
//         <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
//           Admin Dashboard
//         </h1>
//         <p className="text-gray-600 mt-2 text-lg">
//           Quick insights into your platform performance
//         </p>
//       </div>

//       {error && (
//         <p className="text-red-600 mb-4 bg-red-50 p-3 rounded">{error}</p>
//       )}

//       {/* Stat Cards */}
//       {!data ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="bg-gray-200 rounded-2xl shadow animate-pulse h-32"
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Users */}
//           <StatCard
//             icon={Users}
//             label="Users"
//             value={data.usersCount}
//             description="Total number of registered users actively engaging with the platform."
//             color={{ gradient: "from-blue-500 to-blue-700" }}
//             delay={0.1}
//           />
//           {/* Donations */}
//           <StatCard
//             icon={HeartHandshake}
//             label="Donations"
//             value={data.donationsTotal}
//             description="Cumulative donation amount collected from generous supporters."
//             color={{ gradient: "from-green-500 to-emerald-700" }}
//             delay={0.2}
//           />
//           {/* Campaigns */}
//           <StatCard
//             icon={BarChart3}
//             label="Campaigns"
//             value={data.campaignsCount}
//             description="Total active campaigns currently running to support key causes."
//             color={{ gradient: "from-purple-500 to-indigo-700" }}
//             delay={0.3}
//           />

//           {/* Payment Methods */}
//           {/* Payment Methods */}
// {data.paymentMethodTotals &&
//   Object.entries(data.paymentMethodTotals)
//     .filter(([method]) => ["paystack", "stripe", "espee"].includes(method))
//     .map(([method, total], idx) => {
//       const displayName = {
//         paystack: "Paystack",
//         stripe: "Stripe",
//         espee: "Espee",
//       }[method];

//       return (
//         <StatCard
//           key={method}
//           icon={CreditCard}
//           label={displayName}
//           value={total}
//           description={`Total payments received via ${displayName}.`}
//           color={{ gradient: "from-yellow-500 to-orange-700" }}
//           delay={0.4 + idx * 0.1}
//         />
//       );
//     })}

//         </div>
//       )}
//     </motion.div>
//   );
// }





import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAnalytics } from "../api/apiServices";
import { Users, HeartHandshake, BarChart3, CreditCard } from "lucide-react";

// Reusable animated stat card
function StatCard({ icon: Icon, label, value, description, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`rounded-3xl p-6 shadow-xl bg-gradient-to-br ${color.gradient} text-white hover:scale-105 transition-transform duration-300 cursor-pointer`}
    >
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-full bg-white/20 flex items-center justify-center">
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <p className="text-sm opacity-90">{label}</p>
          <p className="text-3xl font-extrabold tracking-tight">
            {value !== null && value !== undefined
              ? new Intl.NumberFormat().format(value)
              : "-"}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm opacity-80 leading-snug">{description}</p>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getAnalytics();
        // Normalize backend response to frontend keys
        setData({
          usersCount: res.users || 0,
          campaignsCount: res.approvedCampaigns || 0,
          donationsTotal: res.successfulDonations || 0,
          paymentMethodTotals: res.paymentMethodTotals || {},
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics. Please try again.");
      }
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-8"
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Quick insights into your platform performance
        </p>
      </div>

      {error && (
        <p className="text-red-600 mb-4 bg-red-50 p-3 rounded">{error}</p>
      )}

      {/* Stat Cards Grid */}
      {!data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-3xl shadow animate-pulse h-40"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Users */}
          <StatCard
            icon={Users}
            label="Users"
            value={data.usersCount}
            description="Total registered users actively engaging on the platform."
            color={{ gradient: "from-blue-500 to-blue-700" }}
            delay={0.1}
          />

          {/* Donations */}
          <StatCard
            icon={HeartHandshake}
            label="Donations"
            value={data.donationsTotal}
            description="Total successful donations received."
            color={{ gradient: "from-green-500 to-emerald-700" }}
            delay={0.2}
          />

          {/* Campaigns */}
          <StatCard
            icon={BarChart3}
            label="Approved Campaigns"
            value={data.campaignsCount}
            description="Total approved campaigns supporting key causes."
            color={{ gradient: "from-purple-500 to-indigo-700" }}
            delay={0.3}
          />

          {/* Payment Methods */}
          {data.paymentMethodTotals &&
            ["paystack", "stripe", "espee"].map((method, idx) => {
              const displayName = {
                paystack: "Paystack",
                stripe: "Stripe",
                espee: "Espee",
              }[method];
              return (
                <StatCard
                  key={method}
                  icon={CreditCard}
                  label={displayName}
                  value={data.paymentMethodTotals[method]}
                  description={`Total payments via ${displayName}.`}
                  color={{ gradient: "from-yellow-500 to-orange-700" }}
                  delay={0.4 + idx * 0.1}
                />
              );
            })}
        </div>
      )}
    </motion.div>
  );
}
