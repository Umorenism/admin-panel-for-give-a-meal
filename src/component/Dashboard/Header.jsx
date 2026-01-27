import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import { FaUserCircle } from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";
import defaultAvatar from "../../assets/profile.svg";

export default function Header({ setIsOpen }) {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastPlayed, setLastPlayed] = useState(0);

  // Dynamic placeholder text
  const getPlaceholder = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    if (lastSegment === "dashboard") return "Search anything in the dashboard";
    if (lastSegment)
      return `Search ${lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)} by name`;
    return "Search";
  };

  // Load admin profile from localStorage
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setProfile({
        name: storedAdmin.name || "Admin Name",
        email: storedAdmin.email || "admin@example.com",
        role: storedAdmin.role || "Admin",
        image: storedAdmin.profilePic || "", // optional image
      });
    }
  }, []);

  const unreadRideOrders = notifications.filter(
    (n) => !n.read && n.type === "ride-order"
  ).length;

  // Play notification sound with cooldown
  const playNotificationSound = () => {
    const now = Date.now();
    const cooldown = 10000;
    if (now - lastPlayed >= cooldown) {
      // Optional audio
      // const audio = new Audio(notificationSound);
      // audio.play().catch((err) => console.error(err.message));
      setLastPlayed(now);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      toast.success(`You searched for: ${searchQuery}`);
      console.log("🔍 Search key:", searchQuery);
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 lg:left-[297px] right-0 z-40 bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200 h-[72px]">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-2xl text-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu />
      </button>

      {/* Search */}
      <div className="flex items-center space-x-3 bg-gray-100 px-3 py-3 rounded-[15px] w-full max-w-sm ml-4">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          className="bg-transparent text-black outline-none text-sm w-full placeholder:text-black"
        />
      </div>

      {/* Notifications + Profile */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative" onClick={playNotificationSound}>
          <FaBell className="text-gray-600 text-xl cursor-pointer" />
          {unreadRideOrders > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
              {unreadRideOrders}
            </span>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-200">
            {profile.image ? (
              <img
                src={profile.image}
                alt="profile"
                className="h-full w-full object-cover rounded-full"
              />
            ) : profile.name ? (
              <span className="text-white font-semibold text-sm">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            ) : (
              <FaUserCircle className="text-gray-500 text-2xl" />
            )}
          </div>

          {/* Admin Name and Role */}
          <div className="text-left hidden sm:block">
            <h1 className="text-sm font-semibold text-gray-800">{profile.name}</h1>
            <p className="text-xs text-gray-500">{profile.role}</p>
            <p className="text-xs text-gray-400">{profile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
