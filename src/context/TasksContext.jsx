import React, { createContext, useContext, useState, useEffect } from "react";
import { taskService } from "../services/taskService.js";
import { useAuth } from "./AuthContext.jsx";

const TaskContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    getAll()
  }, []);

  const getAll = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await taskService.getAllTasks(token);
      setTasks(fetchedTasks);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message)
    }
  };

  return (
    <TaskContext.Provider value={{tasks, isLoading, error}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within an TasksProvider');
    }
    return context;
};
