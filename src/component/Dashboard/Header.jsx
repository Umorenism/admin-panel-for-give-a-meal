


import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { dashboardRoutes } from "../../utils/dashboardRoutes";

export default function Header({ setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastPlayed, setLastPlayed] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  /* -------------------- LIGHT/DARK MODE -------------------- */
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    toast.success(`Switched to ${newTheme} mode`);
  };

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  /* -------------------- PROFILE SYNC -------------------- */
  const syncProfile = useCallback(() => {
    try {
      const raw = localStorage.getItem("admin");
      if (!raw) return;
      const admin = JSON.parse(raw);
      setProfile({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        image: admin.profilePic,
      });
    } catch (err) {
      console.error("Profile sync failed:", err);
    }
  }, []);

  useEffect(() => {
    syncProfile();
    window.addEventListener("storage", syncProfile);
    return () => window.removeEventListener("storage", syncProfile);
  }, [syncProfile]);

  /* -------------------- NOTIFICATIONS -------------------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("admin_notifications") || "[]");
    setNotifications(stored);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const playNotificationSound = () => {
    const now = Date.now();
    if (now - lastPlayed < 8000) return;
    setLastPlayed(now);
  };

  /* -------------------- SEARCH -------------------- */
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = dashboardRoutes.filter((r) =>
      r.label.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      navigate(searchResults[0].path);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const selectResult = (path) => {
    navigate(path);
    setSearchQuery("");
    setSearchResults([]);
  };

  /* -------------------- PLACEHOLDER -------------------- */
  const getPlaceholder = () => {
    const seg = location.pathname.split("/").filter(Boolean).pop();
    if (!seg) return "Search dashboard...";
    return `Search ${seg}`;
  };

  if (!profile) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-white dark:bg-gray-900 h-[72px] flex items-center justify-center text-gray-600 dark:text-gray-200">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 lg:left-[297px] right-0 z-[9999] bg-white dark:bg-gray-900 px-6 h-[72px] flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
      <Toaster position="top-right" />

      {/* Mobile menu */}
      <button onClick={() => setIsOpen(true)} className="lg:hidden text-2xl text-gray-700 dark:text-gray-300">
        <FiMenu />
      </button>

      {/* 🔍 Search */}
      <div className="relative flex items-center w-full max-w-sm ml-4">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl w-full">
          <FaSearch className="text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder()}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="bg-transparent ml-2 outline-none w-full text-sm text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Dropdown results */}
        {searchResults.length > 0 && (
          <ul className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 max-h-60 overflow-auto">
            {searchResults.map((r) => (
              <li
                key={r.path}
                className="px-4 py-2 cursor-pointer text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => selectResult(r.path)}
              >
                {r.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔔 Notifications + Profile + Theme Toggle */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Toggle Light/Dark Mode"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {/* Notifications */}
        <div className="relative cursor-pointer" onClick={playNotificationSound}>
          <FaBell className="text-xl text-gray-600 dark:text-gray-300" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {profile.image ? (
              <img src={profile.image} alt="profile" className="h-full w-full object-cover" />
            ) : (
              <FaUserCircle className="text-gray-500 dark:text-gray-300 text-2xl" />
            )}
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{profile.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{profile.role}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{profile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
