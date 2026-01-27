
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { getTotalDonation, getAnalytics } from "../api/apiServices";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination, Autoplay } from "swiper/modules";
// import { Heart, Calendar, CreditCard } from "lucide-react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// export default function TotalDonationPage() {
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [totalDonation, setTotalDonation] = useState(0);
//   const [paymentMethods, setPaymentMethods] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Fetch total donation + payment methods
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [totalRes, analyticsRes] = await Promise.all([
//         getTotalDonation({ from, to }),
//         getAnalytics(),
//       ]);

//       setTotalDonation(totalRes.total ?? 0);
//       setPaymentMethods(analyticsRes.paymentMethodTotals ?? {});
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Optional: fetch on load
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const images = [
//     "https://images.pexels.com/photos/6646926/pexels-photo-6646926.jpeg",
//     "https://images.pexels.com/photos/6646901/pexels-photo-6646901.jpeg",
//     "https://images.pexels.com/photos/8061641/pexels-photo-8061641.jpeg",
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 6 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="space-y-8"
//     >
//       {/* Hero Slider */}
//       <Swiper
//         modules={[Pagination, Autoplay]}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000 }}
//         loop
//         className="rounded-xl mt-4 max-w-[1400px] overflow-hidden shadow-lg"
//       >
//         {images.map((img, i) => (
//           <SwiperSlide key={i}>
//             <div className="relative w-full h-64 md:h-[420px]">
//               <img src={img} alt={`slide-${i}`} className="absolute inset-0 w-full h-full object-cover" />
//               <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                 <div className="text-center text-white px-6">
//                   <h2 className="text-2xl md:text-4xl font-bold mb-2">Empower Change</h2>
//                   <p className="text-sm md:text-lg">
//                     Together we can make a difference with every donation.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Filters */}
//       <div className="bg-white p-6 rounded-lg shadow space-y-4">
//         <h2 className="text-2xl text-black font-bold flex items-center gap-2">
//           <Heart className="text-orange-500" /> Total Donation
//         </h2>
//         <div className="flex flex-col md:flex-row gap-3">
//           <div className="flex items-center gap-2 border p-2 rounded w-full md:w-auto">
//             <Calendar className="w-4 h-4 text-gray-200" />
//             <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="outline-none flex-1" />
//           </div>
//           <div className="flex items-center gap-2 border p-2 rounded w-full md:w-auto">
//             <Calendar className="w-4 h-4 text-gray-500" />
//             <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="outline-none flex-1" />
//           </div>
//           <button
//             onClick={fetchData}
//             disabled={loading}
//             className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
//           >
//             {loading ? "Loading..." : "Fetch"}
//           </button>
//         </div>
//       </div>

//       {/* Total Donation Result */}
//       <div className="bg-white p-6 rounded-lg shadow text-center">
//         <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">Donation Summary</h3>
//           <p className="text-4xl font-bold text-orange-600">${new Intl.NumberFormat().format(totalDonation)}</p>
//           <p className="text-gray-500 mt-1">
//             From {from || "Start"} to {to || "Today"}
//           </p>
//         </motion.div>
//       </div>

//       {/* Payment Method Totals */}
//       {paymentMethods && Object.keys(paymentMethods).length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {Object.entries(paymentMethods)
//             .filter(([method]) => ["paystack", "stripe", "espee"].includes(method))
//             .map(([method, total], idx) => {
//               const displayName = { paystack: "Paystack", stripe: "Stripe", espee: "Espee" }[method];
//               return (
//                 <motion.div
//                   key={method}
//                   className="p-6 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-700 text-white shadow-lg"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="text-sm opacity-80">{displayName}</p>
//                       <p className="text-2xl font-bold">{total}</p>
//                     </div>
//                     <CreditCard size={32} />
//                   </div>
//                   <p className="mt-3 text-sm opacity-90">Total payments received via {displayName}</p>
//                 </motion.div>
//               );
//             })}
//         </div>
//       )}

//       {/* Optional Donation Trend Chart (mocked monthly totals) */}
//       <div className="bg-white p-6 rounded-lg shadow mt-6">
//         <h3 className="text-lg font-semibold mb-4 text-gray-700">Donation Trend (Monthly)</h3>
//         <Line
//           data={{
//             labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//             datasets: [
//               {
//                 label: "Donations ($)",
//                 data: [500, 1200, 900, 1400, 1700, totalDonation], // include latest total for demo
//                 borderColor: "#f97316",
//                 backgroundColor: "rgba(249,115,22,0.3)",
//                 tension: 0.4,
//                 fill: true,
//                 pointBackgroundColor: "#f97316",
//               },
//             ],
//           }}
//           options={{
//             plugins: { legend: { labels: { color: "#374151" } } },
//             scales: {
//               x: { ticks: { color: "#374151" } },
//               y: { ticks: { color: "#374151" } },
//             },
//           }}
//         />
//       </div>
//     </motion.div>
//   );
// }








import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTotalDonation, getAnalytics, getAllDonations } from "../api/apiServices";
import { toast, Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Heart, CreditCard, DollarSign, TrendingUp } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TotalDonationPage() {
  const [totalDonation, setTotalDonation] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState({});
  const [donations, setDonations] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState(Array(12).fill(0));
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [totalRes, analyticsRes, donationsRes] = await Promise.all([
        getTotalDonation(),
        getAnalytics(),
        getAllDonations(),
      ]);

      // Convert kobo → Naira
      setTotalDonation((totalRes.total || 0) / 100);
      setPaymentMethods(analyticsRes.paymentMethodTotals || {});
      setDonations(donationsRes || []);

      toast.success("Live donation data loaded", { duration: 3000 });
    } catch (err) {
      console.error("Failed to fetch donation data:", err);
      toast.error("Unable to load donation statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute real monthly totals from /api/admin/donations
  useEffect(() => {
    if (donations.length === 0) return;

    const totals = Array(12).fill(0);
    const currentYear = new Date().getFullYear(); // 2026 in your case

    donations.forEach((donation) => {
      if (donation.status !== "success") return;

      const date = new Date(donation.createdAt);
      if (date.getFullYear() !== currentYear) return;

      const monthIndex = date.getMonth(); // 0 = Jan, 11 = Dec
      totals[monthIndex] += donation.amount / 100; // to Naira
    });

    setMonthlyTotals(totals);
    console.log(`Monthly totals for ${currentYear} (Naira):`, totals);
  }, [donations]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const images = [
    "https://images.pexels.com/photos/6646926/pexels-photo-6646926.jpeg",
    "https://images.pexels.com/photos/6646901/pexels-photo-6646901.jpeg",
    "https://images.pexels.com/photos/8061641/pexels-photo-8061641.jpeg",
  ];

  // Dynamic bar chart – uses REAL monthly totals from donations
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: `${new Date().getFullYear()} Monthly Donations (₦)`,
        data: monthlyTotals,
        backgroundColor: "rgba(249, 115, 22, 0.75)",
        borderColor: "#f97316",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => formatCurrency(context.parsed.y),
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "₦" + (value / 1000000).toFixed(1) + "M",
          color: "#4b5563",
        },
        grid: { color: "#e5e7eb" },
      },
      x: {
        ticks: { color: "#4b5563" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Toaster position="top-right" richColors />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Hero Banner */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="rounded-2xl overflow-hidden shadow-2xl"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative aspect-[21/9] md:aspect-[3/1]">
                <img src={img} alt="Impact" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end pb-12 md:pb-16">
                  <div className="px-8 md:px-12 pb-6 text-white max-w-3xl">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">Every Donation Changes Lives</h1>
                    <p className="text-lg md:text-xl opacity-90 max-w-xl">
                      Real-time overview of support received through Give A Meal
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Raised</p>
                <p className="text-3xl md:text-4xl font-bold text-orange-600 mt-1">
                  {loading ? "—" : formatCurrency(totalDonation)}
                </p>
              </div>
              <Heart className="text-orange-500" size={40} strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Transactions</p>
                <p className="text-3xl md:text-4xl font-bold text-green-600 mt-1">
                  {loading ? "—" : donations.length}
                </p>
              </div>
              <CreditCard className="text-green-600" size={40} strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Latest Update</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600 mt-1">
                  {new Date().toLocaleString("en-NG")}
                </p>
              </div>
              <TrendingUp className="text-blue-600" size={40} strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Methods Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {["paystack", "stripe", "espee"].map((method) => {
              const amount = (paymentMethods[method] || 0) / 100;
              const name = { paystack: "Paystack", stripe: "Stripe", espee: "Espee" }[method];
              return (
                <motion.div
                  key={method}
                  className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 text-center hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.03 }}
                >
                  <p className="text-sm font-medium text-orange-800 mb-2">{name}</p>
                  <p className="text-3xl font-bold text-orange-700">
                    {loading ? "—" : formatCurrency(amount)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Bar Chart – Powered by real /api/admin/donations data */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {new Date().getFullYear()} Monthly Donation Overview
          </h2>
          <div className="h-80">
            {loading ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                Loading real monthly data...
              </div>
            ) : monthlyTotals.every((v) => v === 0) ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                No donations this year yet
              </div>
            ) : (
              <Bar data={barChartData} options={barChartOptions} />
            )}
          </div>
        </div>

        {/* All Donations Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">All Donations</h2>
            <p className="text-gray-600 mt-1">
              Showing {donations.length} successful transactions
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading donations...</div>
          ) : donations.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No donations found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.map((donation) => (
                    <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-orange-700">
                        {formatCurrency(donation.amount / 100)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {donation.donor?.name || "Anonymous"}
                      </td>
                      <td className="px-6 py-4">
                        {donation.campaign?.title || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {donation.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(donation.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}