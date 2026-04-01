import axios from "axios";

const API_URL = "http://localhost:9090/api/todo";

export const taskService = {
  getAllTasks: async (token) => {
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

  createTask: async (task, files, token) => {
    try {
      const response = await axios.postForm(API_URL, {
        todo: new Blob([JSON.stringify(task)], { type: 'application/json' }),
        ...(files?.length ? {files: files} : {})
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Error creating task");
    }
  },

  updateTask: async (task, attachments) => {},

  deleteTask: async (taskId) => {},
};
