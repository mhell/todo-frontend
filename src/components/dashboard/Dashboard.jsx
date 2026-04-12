import React, { useState, useEffect, useMemo } from "react";
import "./Dashboard.css";
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../common/Header.jsx";
import TaskTable from "./TaskTable.jsx";
import TaskTableItem from "./TaskTableItem.jsx";
import Stats from "./Stats.jsx";
import AlertBar from "../common/AlertBar.jsx";
import Modal from "../common/Modal.jsx";
import TaskForm from "../common/TaskForm.jsx";
import { useTasks } from "../../context/TaskContext.jsx";
import { usePersons } from "../../context/PersonContext.jsx";
import { useConfirmation } from "../../hooks/useConfirmation.jsx";

const NUM_RECENT = 10;

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { tasks, loadLatestPlusOverdue, isLoading: isLoadingTasks, error: errorTasks, update, remove } = useTasks();
  const { loadAll: loadAllPersons, isLoading: isLoadingPersons, error: errorPersons } = usePersons();
  const { confirm, confirmModal } = useConfirmation();
  const sortedTasks = useMemo(() => [...tasks].sort((a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)), [tasks]);
  const recentTasks = useMemo(() => sortedTasks.filter((task) => Date.parse(task.dueDate) > Date.now()), [sortedTasks]);
  const overdueTasks = useMemo(() => sortedTasks.filter((task) => Date.parse(task.dueDate) < Date.now()), [sortedTasks]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    loadLatestPlusOverdue(NUM_RECENT);
    loadAllPersons();
  }, []);

  const handleUpdateTask = async (task) => {
    await update(task);
    setEditTask(null);
  };

  const handleRemoveTask = (task) => {
    confirm((ok) => ok && remove(task.id));
  };

  const handleCancelEdit = () => {
    setEditTask(null);
  };

  return (
    <div id="dashboard" className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="dashboard-main">
        <Header title="Dashboard" subtitle="Welcome back! Here's your tasks overview" onToggleSidebar={() => setIsSidebarOpen(true)}>
          {(isLoadingTasks || isLoadingPersons) && <div className="loader"></div>}
          {(errorTasks || errorPersons) && (
            <AlertBar message={errorTasks.message || errorPersons.message} key={errorTasks.timestamp || errorPersons.timestamp} />
          )}
        </Header>
        <div className="dashboard-content">
          <div className="stats-grid">
            <Stats />
          </div>
          <div className="tasks-grid">
            <TaskTable title="Recent Tasks" isOverdue={false}>
              {recentTasks?.map((task, index) => (
                <TaskTableItem
                  key={task.id}
                  task={task}
                  index={index}
                  onComplete={handleUpdateTask}
                  onEdit={setEditTask}
                  onRemove={handleRemoveTask}
                />
              ))}
            </TaskTable>
            <TaskTable title="Overdue Tasks" isOverdue={true} numOverdue={overdueTasks?.length}>
              {overdueTasks?.map((task, index) => (
                <TaskTableItem
                  key={task.id}
                  task={task}
                  index={index}
                  onComplete={handleUpdateTask}
                  onEdit={setEditTask}
                  onRemove={handleRemoveTask}
                />
              ))}
            </TaskTable>
          </div>
        </div>
      </main>
      <Modal header="Edit Task" isOpen={!!editTask} onCancel={handleCancelEdit}>
        {editTask && <TaskForm key={editTask.id} editTask={editTask} onSave={handleUpdateTask} onCancel={handleCancelEdit} />}
      </Modal>
      {confirmModal}
    </div>
  );
};

export default Dashboard;
