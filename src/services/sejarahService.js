const API_URL = 'https://budayabatak-backend-production.up.railway.app/api';

const getAuthHeader = () => {
  const token = localStorage.getItem("adminToken");
  console.log("Token yang digunakan:", token);

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const sejarahService = {
  // Get all sejarah cards (public)
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/sejarah`);
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error("getAll error:", error);
      return { success: false, error: error.message };
    }
  },

  // Get single sejarah by id
  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/sejarah/${id}`);
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error("getById error:", error);
      return { success: false, error: error.message };
    }
  },

  // Create sejarah (admin)
  create: async (formData) => {
    try {
      console.log("Creating sejarah with data:", formData);
      console.log("Headers:", getAuthHeader());

      const response = await fetch(`${API_URL}/sejarah`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Create response:", data);

      if (!response.ok) {
        return { success: false, error: data.error || "Gagal membuat data" };
      }

      return { success: true, data };
    } catch (error) {
      console.error("create error:", error);
      return { success: false, error: error.message };
    }
  },

  // Update sejarah (admin)
  update: async (id, formData) => {
    try {
      console.log("Updating sejarah id:", id);

      const response = await fetch(`${API_URL}/sejarah/${id}`, {
        method: "PUT",
        headers: getAuthHeader(),
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Gagal update data" };
      }

      return { success: true, data };
    } catch (error) {
      console.error("update error:", error);
      return { success: false, error: error.message };
    }
  },

  // Delete sejarah (admin)
  delete: async (id) => {
    try {
      console.log("Deleting sejarah id:", id);

      const response = await fetch(`${API_URL}/sejarah/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Gagal hapus data" };
      }

      return { success: true, data };
    } catch (error) {
      console.error("delete error:", error);
      return { success: false, error: error.message };
    }
  },
};
