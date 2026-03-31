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

  createTasks: async (task, attachments, token) => {
    try {
      const response = await axios.postForm(API_URL, {
        todo: new Blob([JSON.stringify(task)], { type: 'application/json' }),
        ...(attachments?.length ? {files: attachments} : {})
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

  updateTasks: async (task, attachments) => {},

  deleteTasks: async (taskId) => {},
};
