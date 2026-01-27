




// apiServices.js
import axios from "axios";

const base_url = "https://gameapi.theinnercitymission.net";

// ------------------- GENERAL USER API -------------------
export const apiClient = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

// Attach user token automatically
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token"); // user token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log("[User Request] Adding access_token");
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ✅ attach token
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// ------------------- ADMIN API -------------------
export const adminApi = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

// Attach admin token automatically
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("[Admin Request] Adding admin_token");
    } else {
      console.warn("[Admin Request] No admin_token found");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------- AUTH -------------------

// Admin login
export const loginAdmin = async ({ email, password }) => {
  console.log("🔑 Sending login request:", { email, password });
  try {
    const res = await apiClient.post("/api/auth/login", { email, password });
    const { user, token } = res.data;

    // ✅ Save to keys that AuthContext expects
    if (token) localStorage.setItem("token", token);
    if (user) localStorage.setItem("admin", JSON.stringify(user));

    console.log("[loginAdmin] Saved token and user to localStorage");

    return { user, token };
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

export const createCampaign = async ({ title, description, goalAmount, imageFile }) => {
  try {
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("goalAmount", goalAmount);
    if (imageFile) form.append("image", imageFile);

    const res = await adminApi.post("/api/admin/campaigns", form, { headers: { "Content-Type": "multipart/form-data" } });
    return res.data;
  } catch (err) {
    console.error("❌ [createCampaign] Failed:", err.response?.data || err.message);
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
export const getNotifications = async () => {
  try {
    const res = await apiClient.get("/api/admin/notifications");
    return res.data || [];
  } catch (err) {
    console.error("[getNotifications] Failed:", err.response?.data || err.message);
    throw err;
  }
};

export const createNotification = async ({ title, message, type }) => {
  try {
    const res = await apiClient.post("/api/admin/notifications", { title, message, type });
    return res.data;
  } catch (err) {
    console.error("[createNotification] Failed:", err.response?.data || err.message);
    throw err;
  }
};
