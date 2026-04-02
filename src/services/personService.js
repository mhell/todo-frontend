import axios from "axios";

const API_URL = "http://localhost:9090/api/person";

export const personService = {
  getAll: async (token) => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const apiError = new Error(error.response?.data?.errors?.[0] || error.message || "Error fetching persons");
      apiError.status = error.response?.status;
      throw apiError;
    }
  },

  create: async (person, token) => {
    try {
      const response = await axios.post(`${API_URL}/$register}`, person, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const apiError = new Error(error.response?.data?.errors?.[0] || error.message || "Error creating person");
      apiError.status = error.response?.status;
      throw apiError;
    }
  },

  update: async (person, token) => {
    try {
      const response = await axios.put(`${API_URL}/${person.id}`, person, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const apiError = new Error(error.response?.data?.errors?.[0] || error.message || "Error updating person");
      apiError.status = error.response?.status;
      throw apiError;
    }
  },

  remove: async (personId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/${personId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      const apiError = new Error(error.response?.data?.errors?.[0] || error.message || "Error deleting person");
      apiError.status = error.response?.status;
      throw apiError;
    }
  },
};
