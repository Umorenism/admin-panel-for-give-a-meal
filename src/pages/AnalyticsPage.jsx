




import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAnalytics } from "../api/apiServices";
import {
  Users,
  HeartHandshake,
  BarChart3,
  CreditCard,
} from "lucide-react";

// ------------------ Stat Card ------------------
function StatCard({
  icon: Icon,
  label,
  value,
  subtitle,
  accent = "blue",
  delay = 0,
}) {
  const accents = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    purple: "text-purple-600 bg-purple-50",
    orange: "text-orange-600 bg-orange-50",
    gray: "text-gray-700 bg-gray-100",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value !== null && value !== undefined
              ? new Intl.NumberFormat().format(value)
              : "—"}
          </p>
        </div>

        <div
          className={`h-12 w-12 rounded-xl flex items-center justify-center ${accents[accent]}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {subtitle && (
        <p className="mt-4 text-sm text-gray-500 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ------------------ Page ------------------
export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getAnalytics();

        setData({
          users: res.users || 0,
          campaigns: res.approvedCampaigns || 0,
          donations: res.successfulDonations || 0,
          paymentMethods: res.paymentMethodTotals || {},
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics. Please try again.");
      }
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100/70 px-6 py-8"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* ---------------- Header ---------------- */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Overview
          </h1>
          <p className="text-gray-500">
            Real-time insights into platform activity and performance
          </p>
        </div>

        {/* ---------------- Error ---------------- */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* ---------------- Loading ---------------- */}
        {!data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-2xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ---------------- Stats ---------------- */}
        {data && (
          <>
            {/* Core metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Users}
                label="Total Users"
                value={data.users}
                subtitle="Registered users on the platform"
                accent="blue"
                delay={0.1}
              />

              <StatCard
                icon={HeartHandshake}
                label="Total Donations"
                value={data.donations}
                subtitle="Successful donations received"
                accent="green"
                delay={0.15}
              />

              <StatCard
                icon={BarChart3}
                label="Approved Campaigns"
                value={data.campaigns}
                subtitle="Live and approved campaigns"
                accent="purple"
                delay={0.2}
              />

              <StatCard
                icon={CreditCard}
                label="Payment Channels"
                value={Object.keys(data.paymentMethods).length}
                subtitle="Active payment providers"
                accent="orange"
                delay={0.25}
              />
            </div>

            {/* Payment methods breakdown */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payments by Provider
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {["paystack", "stripe", "espee"].map((method, idx) => {
                  const nameMap = {
                    paystack: "Paystack",
                    stripe: "Stripe",
                    espee: "Espee",
                  };

                  return (
                    <StatCard
                      key={method}
                      icon={CreditCard}
                      label={nameMap[method]}
                      value={data.paymentMethods[method] || 0}
                      subtitle={`Total processed via ${nameMap[method]}`}
                      accent="gray"
                      delay={0.3 + idx * 0.05}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
