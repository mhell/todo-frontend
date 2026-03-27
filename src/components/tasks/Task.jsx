import React, { useEffect, useState } from "react";
import "./Task.css";
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../header/Header.jsx";
import Form from "./Form.jsx";
import TaskList from "./TaskList.jsx";
import TaskListItem from "./TaskListItem.jsx";

const Task = () => {
  // todo*: make this component functional by implementing state management and API calls
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    console.log("mounted task")
    return () => {
      console.log("unmounted task")
    }
  }, []);

  return (
    <div id="task" className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="dashboard-main">
        <Header title="Tasks" subtitle="Manage and organize your tasks" onToggleSidebar={() => setIsSidebarOpen(true)} />
        <div className="container dashboard-content">
          <div className="row">
            <div className="col-lg-11 col-xl-10 mx-auto">
              <Form />
              <TaskList>
                <TaskListItem />
              </TaskList>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Task;
