import React, { useEffect, useState } from "react";
import "./Task.css";
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../header/Header.jsx";
import Form from "./Form.jsx";
import Edit from "./Edit.jsx";
import TaskList from "./TaskList.jsx";
import TaskListItem from "./TaskListItem.jsx";
import useSessionState from "../../hooks/useSessionState.js";

const Task = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSorted, setIsSorted] = useSessionState("isTasksSorted", false);
  const [isFiltered, setIsFiltered] = useSessionState("isTasksFiltered", false);
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
    setIsFiltered(!isFiltered);
  }

  const handleCancel = () => {
    setEditTask(null);
  }

  const tmpTask = {
    id: 1,
    title: "Complete Project Documentation", 
    description: "Write comprehensive documentation for the new features", 
    completed: false,
    dueDate: new Date("2025-08-15T00:00:00"),
    createdAt: new Date("2025-08-07T00:00:00"),
    personId: 1,
    numberOfAttachment: 2,
    attachments: [{fileName: "file01"}, {fileName: "file01"}]
  }
  const tmpTask2 = {
    id: 2,
    title: "!!!!!!", 
    description: "Write comprehensive documentation for the new features", 
    completed: true,
    dueDate: new Date("2025-08-15T00:00:00"),
    createdAt: new Date("2025-08-07T00:00:00"),
    personId: 1,
    numberOfAttachment: 2,
    attachments: [{fileName: "file01"}, {fileName: "file01"}]
  }

  return (
    <div id="task" className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="dashboard-main">
        <Header title="Tasks" subtitle="Manage and organize your tasks" onToggleSidebar={() => setIsSidebarOpen(true)} />
        <div className="container-lg dashboard-content">
          <div className="row">
            <div className="col-lg-11 col-xl-10 mx-auto">
              <Form header="Add New Task" onSave={handleNewTask} />
              <TaskList onSort={handleToggleSort} onFilter={handleToggleFilter} isSorted={isSorted} isFiltered={isFiltered}>
                <TaskListItem task={tmpTask} onComplete={handleUpdateTask} onEdit={setEditTask} onDelete={handleDeleteTask} />
                <TaskListItem task={tmpTask2} onComplete={handleUpdateTask} onEdit={setEditTask} onDelete={handleDeleteTask} />
              </TaskList>
              <Edit header="Edit Task" isOpen={editTask} onCancel={handleCancel}>
                { editTask && 
                  <Form key={editTask.id} onSave={(task) => {setEditTask(null); handleUpdateTask(task)}} onCancel={handleCancel} editTask={editTask} />
                }
              </Edit>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Task;
