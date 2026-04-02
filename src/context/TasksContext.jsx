import React, { createContext, useContext, useState, useEffect } from "react";
import { taskService } from "../services/taskService.js";
import { useAuth } from "./AuthContext.jsx";

const TaskContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, logout } = useAuth();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await taskService.getAll(token);
      setTasks(fetchedTasks);
      setError(null);
    } catch (error) {
      console.log(error);


      if (error.status === 403) {
        await logout();
        return;
      }
      setError(error.message);
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
      setTasks((tasks) => [...tasks, createdTask]);
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
      setError(error.message);
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
      setTasks(tasks.map((task) => task.id === updatedTask.id ? updatedTask : task));
      setError(null);
    } catch (error) {
      if (error.status === 403) {
        await logout();
        return;
      }
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TaskContext.Provider value={{tasks, isLoading, error, getAll, create, update}}>
      {children}
    </TaskContext.Provider>
  );
};


export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within an TasksProvider");
  }
  return context;
};

export default TasksProvider;
