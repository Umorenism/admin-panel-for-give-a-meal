




// apiServices.js
import axios from "axios";

const base_url = "https://gameapi.theinnercitymission.net";

// ------------------- GENERAL USER API -------------------
export const apiClient = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});



apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ✅ SAME AS ADMIN
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ------------------- ADMIN API -------------------
export const adminApi = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

// Attach admin token automatically
// apiServices.js
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");          // ← change to "token"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("[Admin Request] Adding token:", token.substring(0, 20) + "...");
    } else {
      console.warn("[Admin Request] No token found in localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------- AUTH -------------------

// Admin login
// apiServices.js
export const loginAdmin = async ({ email, password }) => {
  console.log("🔑 Sending login request:", { email });

  try {
    const res = await apiClient.post("/api/auth/admin/login", { email, password });
    const { token, admin } = res.data;

    if (!token) throw new Error("No token received from server");

    localStorage.setItem("token", token);                    // consistent key
    localStorage.setItem("admin", JSON.stringify(admin));

    // Optional: set default header for both clients
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    adminApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return { user: admin, token };
  } catch (err) {
    console.error("❌ Login failed:", err.response?.data || err.message);
    throw err;
  }
};

// Admin registration
// ------------------- ADMIN REGISTRATION -------------------
export const registerAdmin = async ({ name, email, password, profilePic }) => {
  const payload = { name, email, password, profilePic };
  console.log("📝 [registerAdmin] Sending payload to /api/auth/admin/register:", payload);

  try {
    const res = await adminApi.post("/api/auth/admin/register", payload);
    console.log("✅ [registerAdmin] Success response:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ [registerAdmin] Failed:", err.response?.data || err.message);
    throw err;
  }
};


// ------------------- USERS / STATS -------------------
export const getUserCount = async () => {
  try {
    const res = await adminApi.get("/api/admin/users/count");
    return res.data; // { count: number }
  } catch (err) {
    console.error("❌ [getUserCount] Failed:", err.response?.data || err.message);
    return { count: 0 };
  }
};

export const getTotalDonation = async () => {
  try {
    const res = await adminApi.get("/api/admin/total-donations");
    return res.data; // { total: number }
  } catch (err) {
    console.error("❌ [getTotalDonation] Failed:", err.response?.data || err.message);
    return { total: 0 };
  }
};

// ------------------- ANALYTICS -------------------
export const getAnalytics = async () => {
  try {
    const res = await adminApi.get("/api/admin/analytics");
    return {
      usersCount: res.data.users || 0,
      donationsTotal: res.data.successfulDonations || 0,
      campaignsCount: res.data.approvedCampaigns || 0,
      paymentMethodTotals: res.data.paymentMethodTotals || { paystack: 0, stripe: 0, espee: 0 },
    };
  } catch (err) {
    console.error("❌ [getAnalytics] Failed:", err.response?.data || err.message);
    return {
      usersCount: 0,
      donationsTotal: 0,
      campaignsCount: 0,
      paymentMethodTotals: { paystack: 0, stripe: 0, espee: 0 },
    };
  }
};

// ------------------- CAMPAIGNS -------------------
export const getApprovedCampaigns = async () => {
  try {
    const res = await adminApi.get("/api/admin/campaigns/approved");
    return res.data;
  } catch (err) {
    console.error("❌ [getApprovedCampaigns] Failed:", err.response?.data || err.message);
    throw err;
  }
};

export const getAllCampaigns = async () => {
  try {
    const res = await adminApi.get("/api/admin/campaigns/all");
    return res.data;
  } catch (err) {
    console.error("❌ [getAllCampaigns] Failed:", err.response?.data || err.message);
    throw err;
  }
};

export const updateCampaignStatus = async (id, isApproved) => {
  try {
    const res = await adminApi.put(`/api/admin/campaigns/${id}`, { isApproved });
    return res.data;
  } catch (err) {
    console.error("❌ [updateCampaignStatus] Failed:", err.response?.data || err.message);
    throw err;
  }
};

export const createCampaign = async ({ title, description, image }) => {
  try {
    const payload = {
      title: title.trim(),
      description: description.trim(),
    };

    if (image?.trim()) {
      payload.image = image.trim();
    }

    console.log("[createCampaign] Sending payload:", payload);

    const res = await adminApi.post("/api/admin/campaigns", payload);

    console.log("[createCampaign] Success:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ [createCampaign] Failed:", {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    throw err;
  }
};

export const approveCampaign = async (id) => {
  try {
    const res = await adminApi.patch(`/api/admin/campaigns/${id}/approved`);
    return res.data;
  } catch (err) {
    console.error("❌ [approveCampaign] Failed:", err.response?.data || err.message);
    throw err;
  }
};

// ------------------- BLOG -------------------
export const createBlog = async ({ title, content, image }) => {
  try {
    const res = await adminApi.post("/api/admin/blogs", { title, content, image });
    return res.data;
  } catch (err) {
    console.error("❌ [createBlog] Failed:", err.response?.data || err.message);
    throw err;
  }
};

// ------------------- CAMPAIGN TOGGLE -------------------
export const toggleCampaignApproval = async (id) => {
  try {
    const res = await adminApi.patch(`/api/admin/campaigns/${id}/toggle-approval`);
    return res.data;
  } catch (err) {
    console.error("❌ [toggleCampaignApproval] Failed:", err.response?.data || err.message);
    throw err;
  }
};

// ------------------- ADMIN PROFILE -------------------
export const getAdminProfile = async () => {
  try {
    const res = await adminApi.get("/api/auth/admin/me");
    return res.data;
  } catch (err) {
    console.error("❌ [getAdminProfile] Failed:", err.response?.data || err.message);
    throw err;
  }
};

export const updateAdminProfile = async (data) => {
  try {
    const res = await adminApi.put("/api/auth/admin/update-profile", data);
    return res.data;
  } catch (err) {
    console.error("❌ [updateAdminProfile] Failed:", err.response?.data || err.message);
    throw err;
  }
};

// ------------------- DONATIONS -------------------
export const getAllDonations = async () => {
  try {
    const res = await adminApi.get("/api/admin/donations");
    return res.data; // array of donation objects
  } catch (err) {
    console.error("❌ [getAllDonations] Failed:", err.response?.data || err.message);
    return [];
  }
};


// Notifications
// apiServices.js – replace the notification functions

export const getNotifications = async () => {
  try {
    const res = await adminApi.get("/api/admin/notifications");   // ← adminApi
    return res.data || [];
  } catch (err) {
    console.error("[getNotifications] Failed:", err.response?.data || err.message);
    throw err;
  }
};

export const createNotification = async ({ title, message, type }) => {
  try {
    const token = localStorage.getItem("token");
    console.log("[createNotification] Token present?", !!token);
    console.log("[createNotification] Token preview:", token ? token.substring(0, 20) + "..." : "NO TOKEN");

    const res = await adminApi.post("/api/admin/notifications", { title, message, type });
    return res.data;
  } catch (err) {
    console.error("[createNotification] Failed:", {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    throw err;
  }
};