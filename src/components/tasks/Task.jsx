import React, { useState, useContext } from "react";
import "./Task.css";
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../header/Header.jsx";
import Form from "./Form.jsx";
import Edit from "./Edit.jsx";
import TaskList from "./TaskList.jsx";
import TaskListItem from "./TaskListItem.jsx";
import useSessionState from "../../hooks/useSessionState.js";
import { useTasks } from "../../context/TasksContext.jsx";

const Task = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSorted, setIsSorted] = useSessionState("isTasksSorted", false);
  const [isFiltered, setIsFiltered] = useSessionState("isTasksFiltered", false);
  const [editTask, setEditTask] = useState(null);
  const {tasks} = useTasks();

  tasks && console.log(tasks);

  const handleNewTask = (task) => {
    console.log(task);
  }

  const handleUpdateTask = (task) => {
    setEditTask(null);
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
                {
                  tasks?.map((task) => (
                    <TaskListItem key={task.id} task={task} onComplete={handleUpdateTask} onEdit={setEditTask} onDelete={handleDeleteTask} />
                  ))
                }
              </TaskList>
              <Edit header="Edit Task" isOpen={!!editTask} onCancel={handleCancel}>
                { editTask && 
                  <Form key={editTask.id} onSave={handleUpdateTask} onCancel={handleCancel} editTask={editTask} />
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
