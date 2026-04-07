import React, { createContext, useContext, useState } from "react";
import { taskService } from "../services/taskService.js";
import { useAuth } from "./AuthContext.jsx";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();

  const getAll = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await taskService.getAll(token);
      setTasks(fetchedTasks);
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
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
      setTasks([...tasks, createdTask]);
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
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
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (taskId) => {
    try {
      setIsLoading(true);
      await taskService.remove(taskId, token);
      setTasks(tasks.filter((task) => task.id !== taskId));
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
      setError({message: error.message, timestamp: Date.now()});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, isLoading, error, getAll, create, update, remove }}>
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
