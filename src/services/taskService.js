import axios from "axios";

const API_URL = "http://localhost:9090/api/todo";

export const taskService = {
  getAll: async (token) => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const apiError = new Error(error.response?.data?.errors?.[0] || error.message || "Error fetching tasks");
      apiError.status = error.response?.status;
      throw apiError;
    }
  },

  create: async (task, files, token) => {
    const form = createFormData(task, files);
    try {
      const response = await axios.postForm(API_URL, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const apiError = new Error(error.response?.data?.errors?.[0] || error.message || "Error creating task");
      apiError.status = error.response?.status;
      throw apiError;
    }
  },

  update: async (task, files, token) => {
    const form = createFormData(task, files);
    try {
      const response = await axios.putForm(`${API_URL}/${task.id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const apiError = new Error(error.response?.data?.errors?.[0] || error.message || "Error updating task");
      apiError.status = error.response?.status;
      throw apiError;
    }
  },

  remove: async (taskId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      const apiError = new Error(error.response?.data?.errors?.[0] || error.message || "Error deleting task");
      apiError.status = error.response?.status;
      throw apiError;
    }
  },
};

function createFormData(task, files) {
  const form = new FormData();
  form.append("todo", new Blob([JSON.stringify(task)], { type: "application/json" }));
  if (files.length) {
    files.forEach((file) => {
      form.append("files", file);
    });
  } else {
    form.append("clearFiles", "true");
  }
  return form;
}
