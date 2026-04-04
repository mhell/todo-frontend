import "./Task.css";
import React, { useState, useMemo } from "react";
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../common/Header.jsx";
import Form from "./Form.jsx";
import Modal from "../common/Modal.jsx";
import TaskList from "./TaskList.jsx";
import TaskListItem from "./TaskListItem.jsx";
import useSessionState from "../../hooks/useSessionState.js";
import { useConfirmation } from "../../hooks/useConfirmation.jsx";
import { useTasks } from "../../context/TaskContext.jsx";

const Task = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSorted, setIsSorted] = useSessionState("isTasksSorted", false);
  const [isFiltered, setIsFiltered] = useSessionState("isTasksFiltered", false);
  const { confirm, confirmModal } = useConfirmation();
  const [editTask, setEditTask] = useState(null);
  const { tasks, isLoading: isLoadingTasks, error: errorTasks, create, update, remove } = useTasks();
  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) => (isFiltered ? !task.completed : true)).sort((a, b) => (isSorted ? Date.parse(a.dueDate) - Date.parse(b.dueDate) : 0)),
    [tasks, isSorted, isFiltered]
  );

  const handleNewTask = (task) => {
    create(task);
  };

  const handleUpdateTask = (task) => {
    update(task);
    setEditTask(null);
  };

  const handleRemoveTask = (task) => {
    confirm((ok) => {
      if (ok) {
        remove(task.id);
      }
    });
  };

  const handleToggleSort = () => {
    setIsSorted(!isSorted);
  };

  const handleToggleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  const handleCancel = () => {
    setEditTask(null);
  };

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
                {visibleTasks?.map((task) => 
                  <TaskListItem key={task.id} task={task} onComplete={handleUpdateTask} onEdit={setEditTask} onRemove={handleRemoveTask} />
                )}
              </TaskList>
            </div>
          </div>
        </div>
      </main>
      <Modal header="Edit Task" isOpen={!!editTask} onCancel={handleCancel}>
        {editTask && <Form key={editTask.id} onSave={handleUpdateTask} onCancel={handleCancel} editTask={editTask} />}
      </Modal>
      {confirmModal}
    </div>
  );
};

export default Task;
