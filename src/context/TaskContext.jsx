import React, { createContext, useContext, useState } from "react";
import { taskService } from "../services/taskService.js";
import { useAuth } from "./AuthContext.jsx";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();

  const loadAll = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await taskService.getAll(token);
      setError(null);
      setTasks(fetchedTasks);
    } catch (error) {
      if (await handle403(error.status)) return;
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  const getOverdue = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await taskService.getOverdue(token);
      setError(null);
      return fetchedTasks;
    } catch (error) {
      if (await handle403(error.status)) return;
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  const getUpcoming = async (limit) => {
    try {
      setIsLoading(true);
      const fetchedTasks = await taskService.getUpcoming(limit, token);
      setError(null);
      return fetchedTasks;
    } catch (error) {
      if (await handle403(error.status)) return;
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  const getStats = async () => {
    try {
      setIsLoading(true);
      const stats = await taskService.getStats(token);
      setError(null);
      return stats;
    } catch (error) {
      if (await handle403(error.status)) return;
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  const create = async (task) => {
    const { attachments, ...taskWithoutFiles } = task;
    const filesArray = Array.from(attachments);
    try {
      setIsLoading(true);
      const createdTask = await taskService.create(taskWithoutFiles, filesArray, token);
      setError(null);
      setTasks([...tasks, createdTask]);
    } catch (error) {
      if (await handle403(error.status)) return;
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (task) => {
    const { attachments, ...taskWithoutFiles } = task;
    const filesArray = Array.from(attachments);
    try {
      setIsLoading(true);
      const updatedTask = await taskService.update(taskWithoutFiles, filesArray, token);
      setError(null);
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    } catch (error) {
      if (await handle403(error.status)) return;
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (taskId) => {
    try {
      setIsLoading(true);
      await taskService.remove(taskId, token);
      setError(null);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      if (await handle403(error.status)) return;
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  async function handle403(httpstatus) {
    if (httpstatus === 403) {
      await logout();
      return true;
    }
    return false;
  }

  return (
    <TaskContext.Provider value={{ tasks, isLoading, error, loadAll, getOverdue, getUpcoming, getStats, create, update, remove }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within an TaskProvider");
  }
  return context;
};

export default TaskProvider;
