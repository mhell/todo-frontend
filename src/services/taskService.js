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
      throw new Error(error.message || "Error fetching tasks");
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
      throw new Error(error.response?.data.errors[0] || error.message || "Error creating task");
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
      throw new Error(error.response?.data.errors[0] || error.message || "Error creating task");
    }
  },

  delete: async (taskId) => {

  },
};

function createFormData(task, files) {
  const form = new FormData();
  form.append("todo", new Blob([JSON.stringify(task)], { type: "application/json" }));
  if (files) {
    files.forEach((file) => {
      form.append("files", file);
    });
  } else {
    form.append("files", null);
  }
  return form;
}

