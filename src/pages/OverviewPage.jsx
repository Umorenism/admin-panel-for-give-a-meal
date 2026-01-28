
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
      className="p-6 dark:text-white dark:bg-gray-900 space-y-8"
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
      <div className="grid dark:text-white dark:bg-gray-900 grid-cols-1 md:grid-cols-3 gap-6">
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
      <div className="grid dark:text-white dark:bg-gray-900 grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl dark:text-white dark:bg-gray-900 dark:border p-6 shadow-lg">
          <h3 className="dark:text-white dark:bg-gray-900 font-semibold text-gray-700 mb-4">
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

        <div className="bg-white dark:text-white dark:bg-gray-900 dark:border rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-gray-700 dark:text-white dark:bg-gray-900 mb-4">
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
      className="bg-white dark:text-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm dark:text-white dark:bg-gray-900 text-gray-500">{title}</p>
          <p className="text-3xl dark:text-white dark:bg-gray-900 font-bold text-gray-800">{value}</p>
        </div>
        <div className="text-indigo-600 text-3xl dark:text-white dark:bg-gray-900">{icon}</div>
      </div>
      <p className="mt-3 text-green-600 text-sm flex items-center dark:text-white dark:bg-gray-900 gap-1">
        <FaArrowUp /> {trend}
      </p>
    </motion.div>
  );
}
