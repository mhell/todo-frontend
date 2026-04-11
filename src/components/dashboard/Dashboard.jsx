import React, { useState, useEffect, useMemo } from "react";
import "./Dashboard.css";
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../common/Header.jsx";
import TaskTable from "./TaskTable.jsx";
import TaskTableItem from "./TaskTableItem.jsx";
import Stats from "./Stats.jsx";
import AlertBar from "../common/AlertBar.jsx";
import { useTasks } from "../../context/TaskContext.jsx";
import { usePersons } from "../../context/PersonContext.jsx";

const NUM_RECENT = 10;

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { tasks, getOverdue, getUpcoming, isLoading: isLoadingTasks, error: errorTasks, update, remove } = useTasks();
  const { loadAll: loadAllPersons, isLoading: isLoadingPersons, error: errorPersons } = usePersons();
  const [recentTasks, setRecentTasks] = useState(null);
  const [overdueTasks, setOverdueTasks] = useState(null);
  
  useEffect(() => {
    async function fetchTasks() {
      setRecentTasks(await getUpcoming(NUM_RECENT));
      setOverdueTasks((await getOverdue())?.sort((a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)));
    }
    fetchTasks();
    loadAllPersons();
  }, [tasks]);

  return (
    <div id="dashboard" className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="dashboard-main">
        <Header title="Dashboard" subtitle="Welcome back! Here's your tasks overview" onToggleSidebar={() => setIsSidebarOpen(true)} >
          {(isLoadingTasks || isLoadingPersons) && <div className="loader"></div>}
          {(errorTasks || errorPersons) && <AlertBar message={errorTasks.message || errorPersons.message} key={errorTasks.timestamp || errorPersons.timestamp} />}
        </Header>
        <div className="dashboard-content">
          <div className="stats-grid">
            <Stats />
          </div>
          <div className="tasks-grid">
            {/* Original title "Recent Tasks" did not match with original logic (using dueDate) */}
            <TaskTable title="Upcoming Tasks" isOverdue={false} >
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
