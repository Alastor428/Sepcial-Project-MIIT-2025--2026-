import axios from "axios";

// Base API configuration
const API_BASE_URL = "http://192.168.99.96:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// User API calls
export const userAPI = {
  // Login user
  login: async (phone: string, pin: string) => {
    const response = await api.post("/user/login", { phone, pin });
    return response.data;
  },

  // Register user
  register: async (userData: any) => {
    const response = await api.post("/user/register", userData);
    return response.data;
  },

  // Get user dashboard
  getDashboard: async (userId: string) => {
    const response = await api.get(`/user/${userId}/dashboard`);
    return response.data;
  },

  // Check user by phone
  checkByPhone: async (phoneNumber: string) => {
    const response = await api.get(`/user/check/${phoneNumber}`);
    return response.data;
  },

  // Get all users (for testing)
  getAllUsers: async () => {
    const response = await api.get("/user");
    return response.data;
  },
};

// Transaction API calls
export const transactionAPI = {
  // Transfer money
  transfer: async (senderId: string, receiverPhone: string, amount: number) => {
    const response = await api.post("/transactions/transfer", {
      senderId,
      receiverPhone,
      amount,
    });
    return response.data;
  },

  // Get user transaction history
  getHistory: async (userId: string, year?: number, month?: number) => {
    const params = new URLSearchParams();
    if (year) params.append("year", year.toString());
    if (month) params.append("month", month.toString());

    const response = await api.get(`/transactions/${userId}/history?${params}`);
    return response.data;
  },

  // Get monthly summary for charts
  getMonthlySummary: async (userId: string, year: number, month: number) => {
    const response = await api.get(
      `/transactions/${userId}/monthly-summary?year=${year}&month=${month}`
    );
    return response.data;
  },

  // Education payment
  processEducationPayment: async (
    senderId,
    institutionId,
    amount,
    studentDetails,
    pin // ✅ Add pin argument
  ) => {
    const response = await api.post("/transactions/education-payment", {
      senderId,
      institutionId,
      amount,
      studentDetails,
      pin, // ✅ Send pin in request body
    });
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get("/health");
    return response.data;
  },
};

export default api;
