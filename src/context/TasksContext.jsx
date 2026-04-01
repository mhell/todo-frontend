import React, { createContext, useContext, useState, useEffect } from "react";
import { taskService } from "../services/taskService.js";
import { useAuth } from "./AuthContext.jsx";

const TaskContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await taskService.getAll(token);
      setTasks(fetchedTasks);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const create = async (task) => {
    const { attachments, ...taskWithoutFiles } = task;
    const filesArray = Array.from(attachments);
    try {
      setIsLoading(true);
      const createdTask = await taskService.create(taskWithoutFiles, filesArray, token);
      setTasks((tasks) => [...tasks, createdTask]);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <TaskContext.Provider value={{ tasks, isLoading, error, getAll, create }}>
      {children}
      {error}
    </TaskContext.Provider>
  );
};

const update = (task) => {
  const { attachments, ...taskWithoutFiles } = task;
  const filesArray = Array.from(attachments);
  
}

// setTasks(tasks.map((task) => task.id === updatedTask.id ? updatedTask : task));

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within an TasksProvider");
  }
  return context;
};

export default TasksProvider;
