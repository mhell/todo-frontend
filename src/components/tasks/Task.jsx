import React from "react";
import "./Task.css";
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../header/Header.jsx";
import Form from "./Form.jsx";
import TaskList from "./TaskList.jsx";

const Task = () => {
  // todo*: make this component functional by implementing state management and API calls

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={false} onClose={() => {}} />
      <main className="dashboard-main">
        <Header title="Tasks" subtitle="Manage and organize your tasks" onToggleSidebar={() => {}} />
        <div className="dashboard-content">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <Form />
              <TaskList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Task;
