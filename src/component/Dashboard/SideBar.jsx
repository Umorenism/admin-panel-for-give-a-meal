





import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MdDashboard, MdAnalytics } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  // Local state to keep the profile in sync
  const [admin, setAdmin] = useState(
    auth?.admin || { name: "Guest", email: "", role: "", profilePic: "" }
  );

  // Live sync admin profile from context & localStorage
  useEffect(() => {
    const updateAdmin = () => {
      const storedAdmin = localStorage.getItem("admin");
      if (storedAdmin) {
        try {
          const parsed = JSON.parse(storedAdmin);
          setAdmin({
            name: parsed.name || "Admin",
            email: parsed.email || "",
            role: parsed.role || "Staff",
            profilePic: parsed.profilePic || "",
          });
        } catch (e) {
          console.error("Failed to parse stored admin:", e);
        }
      } else if (auth?.admin) {
        setAdmin({
          name: auth.admin.name || "Admin",
          email: auth.admin.email || "",
          role: auth.admin.role || "Staff",
          profilePic: auth.admin.profilePic || "",
        });
      }
    };

    updateAdmin();

    // Listen to localStorage changes (profile update from other tabs)
    window.addEventListener("storage", updateAdmin);
    return () => window.removeEventListener("storage", updateAdmin);
  }, [auth]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout(); // clear context & localStorage
    navigate("/login");
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center dark:text-white dark:bg-gray-900 gap-3 px-4 py-3 rounded-[10px] transition-all text-sm font-medium ${
      isActive
        ? "bg-orange-100 text-orange-600 font-semibold"
        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
    }`;

  return (
    <div className="w-[280px] dark:text-white dark:bg-gray-900 h-screen fixed top-0 left-0 bg-white p-6 flex flex-col justify-between shadow-lg border-r border-gray-200 z-50">
      <div>
        <div className="w-full mb-8">
          <h1 className="text-orange-500 font-[900] text-3xl uppercase">GIVE A MEAL</h1>
        </div>

        <nav className="flex dark:text-white dark:bg-gray-900 flex-col gap-2">
          <NavLink to="/dashboard" className={navLinkClasses} end>
            <MdDashboard size={20} /> Dashboard
          </NavLink>

          <div className="mt-4 border-t border-gray-200 dark:text-white dark:bg-gray-900 pt-4 flex flex-col gap-2">
            <NavLink to="/dashboard/campaigns" className={navLinkClasses}>
              Campaigns
            </NavLink>
            <NavLink to="/dashboard/create-campaign" className={navLinkClasses}>
              Create Campaign
            </NavLink>
            <NavLink to="/dashboard/create-blog" className={navLinkClasses}>
              Create Blog
            </NavLink>
          </div>

          <div className="mt-4 dark:text-white dark:bg-gray-900 border-t border-gray-200 pt-4 flex flex-col gap-2">
            <NavLink to="/dashboard/analytics" className={navLinkClasses}>
              <MdAnalytics size={20} /> Analytics
            </NavLink>
            <NavLink to="/dashboard/donations" className={navLinkClasses}>
              Total Donations
            </NavLink>
          </div>

          <div className="mt-4 dark:text-white dark:bg-gray-900 border-t border-gray-200 pt-4 flex flex-col gap-2">
            <NavLink  to="/dashboard/settings" className={navLinkClasses}>
              Register Admin
            </NavLink>
            <NavLink to="/dashboard/notifications" className={navLinkClasses}>
              Notifications
            </NavLink>
            <NavLink to="/dashboard/profile" className={navLinkClasses}>
              Profile Settings
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Profile Section - live synced */}
      <div className="pt-4 dark:text-white dark:bg-gray-900 mb-6 flex items-center gap-4 border-t border-gray-200">
        <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-50 shrink-0">
          {admin.profilePic ? (
            <img
              src={admin.profilePic}
              alt="profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <FaCircleUser className="text-gray-400 text-4xl" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <h1 className="text-sm dark:text-white dark:bg-gray-900 font-bold text-gray-800 truncate">
              {admin.name || "Admin"}
            </h1>
            <span className="text-[10px] uppercase font-bold dark:text-white dark:bg-gray-900 text-orange-500 bg-orange-50 w-fit px-2 rounded-md">
              {admin.role || "Staff"}
            </span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <p className="text-[11px] text-gray-500 dark:text-white dark:bg-gray-900 truncate max-w-[100px]">
              {admin.email}
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 hover:bg-red-50 rounded-full transition-colors group"
              title="Logout"
            >
              <CiLogout className="text-red-600 group-hover:text-red-800" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
