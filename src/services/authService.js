const API_URL = 'https://budayabatak-backend-production.up.railway.app/api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan token ke localStorage
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminEmail", data.admin.email);
        return { success: true, data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout: () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
  },

  getToken: () => localStorage.getItem("adminToken"),

  isAuthenticated: () => !!localStorage.getItem("adminToken"),

  verify: async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return false;

      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
};
