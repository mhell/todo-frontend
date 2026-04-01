import React, { createContext, useContext, useState, useEffect } from "react";
import { taskService } from "../services/taskService.js";
import { useAuth } from "./AuthContext.jsx";

const TaskContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const {token} = useAuth();

  console.log(tasks);

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

  const create = async (task) => {
    console.log("hej");
    const {attachments, ...taskWithoutFiles} = task;
    try {
      setIsLoading(true);
      const createdTask = await taskService.createTask(taskWithoutFiles, attachments, token);
      setTasks((tasks) => [...tasks, createdTask]);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message)
    }
  }

  // setTasks(tasks.map((task) => task.id === updatedTask.id ? updatedTask : task));

  return (
    <TaskContext.Provider value={{tasks, isLoading, error, getAll, create}}>
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

export default TasksProvider;
