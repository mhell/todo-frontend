import React, { useState, useEffect, useMemo } from "react";
import "./Dashboard.css";
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../common/Header.jsx";
import TaskTable from "./TaskTable.jsx";
import TaskTableItem from "./TaskTableItem.jsx";
import Stats from "./Stats.jsx";
import { useTasks } from "../../context/TaskContext.jsx";

const NUM_RECENT = 10;

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { tasks, getOverdue, getUpcoming, isLoading, getStats, error, create, update, remove } = useTasks();
  const [recentTasks, setRecentTasks] = useState(null);
  const [overdueTasks, setOverdueTasks] = useState(null);
  
  useEffect(() => {
    async function fetchTasks() {
      setRecentTasks(await getUpcoming(NUM_RECENT), [tasks]);
      setOverdueTasks((await getOverdue())?.sort((a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate), [overdueTasks]));
    }
    fetchTasks();
  }, [tasks]);

  return (
    <div id="dashboard" className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="dashboard-main">
        <Header title="Dashboard" subtitle="Welcome back! Here's your tasks overview" onToggleSidebar={() => setIsSidebarOpen(true)} />

        <div className="dashboard-content">
          <div className="stats-grid">
            <Stats />
          </div>
          <div className="tasks-grid">
            <TaskTable title="Recent Tasks" isOverdue={false} >
              {recentTasks?.map((task, index) => 
                <TaskTableItem key={task.id} task={task} index={index} />
              )}
            </TaskTable>
            <TaskTable title="Overdue Tasks" isOverdue={true} numOverdue={overdueTasks?.length} >
              {overdueTasks?.map((task, index) => 
                <TaskTableItem key={task.id} task={task} index={index} />
              )}
            </TaskTable>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
