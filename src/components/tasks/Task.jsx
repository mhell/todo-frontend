import React, { useEffect, useState } from "react";
import "./Task.css";
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../header/Header.jsx";
import Form from "./Form.jsx";
import TaskList from "./TaskList.jsx";
import TaskListItem from "./TaskListItem.jsx";
import useSessionState from "../../hooks/useSessionState.js";

const Task = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSorted, setIsSorted] = useSessionState("isTasksSorted", false);
  const [isFiltered, setisFiltered] = useSessionState("isTasksFiltered", false);
  const [editTask, setEditTask] = useState(null);

  const handleNewTask = (task) => {
  }

  const handleUpdateTask = (task) => {
  }

  const handleDeleteTask = (task) => {
  }
  
  const handleToggleSort = () => {
    setIsSorted(!isSorted);
  }

  const handleToggleFilter = () => {
    setisFiltered(!isFiltered);
  }

  return (
    <div id="task" className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="dashboard-main">
        <Header title="Tasks" subtitle="Manage and organize your tasks" onToggleSidebar={() => setIsSidebarOpen(true)} />
        <div className="container-lg dashboard-content">
          <div className="row">
            <div className="col-lg-11 col-xl-10 mx-auto">
              <Form onNew={handleNewTask} />
              <TaskList onSort={handleToggleSort} onFilter={handleToggleFilter}>
                <TaskListItem onComplete={handleUpdateTask} onEdit={(editTask) => setEditTask(editTask)} onDelete={handleDeleteTask} />
              </TaskList>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Task;
