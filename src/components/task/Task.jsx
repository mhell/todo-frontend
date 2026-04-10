import "./Task.css";
import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar.jsx";
import Header from "../common/Header.jsx";
import Form from "./Form.jsx";
import Modal from "../common/Modal.jsx";
import AlertBar from "../common/AlertBar.jsx";
import TaskList from "./TaskList.jsx";
import TaskListItem from "./TaskListItem.jsx";
import useSessionState from "../../hooks/useSessionState.js";
import { useConfirmation } from "../../hooks/useConfirmation.jsx";
import { useTasks } from "../../context/TaskContext.jsx";
import { usePersons } from "../../context/PersonContext.jsx";

const Task = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSorted, setIsSorted] = useSessionState("isTasksSorted", false);
  const [isFiltered, setIsFiltered] = useSessionState("isTasksFiltered", false);
  const { confirm, confirmModal } = useConfirmation();
  const [editTask, setEditTask] = useState(null);
  const { tasks, getAll: getAllTasks, isLoading, error, create, update, remove } = useTasks();
  const { getAll: getAllPersons } = usePersons();
  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) => (isFiltered ? !task.completed : true)).sort((a, b) => (isSorted ? Date.parse(a.dueDate) - Date.parse(b.dueDate) : 0)),
    [tasks, isSorted, isFiltered]
  );

  useEffect(() => {
    getAllTasks();
    getAllPersons();
  }, []);

  const handleNewTask = async (task) => {
    await create(task);
  };

  const handleUpdateTask = async (task) => {
    await update(task);
    setEditTask(null);
  };

  const handleRemoveTask = (task) => {
    confirm((ok) => ok && remove(task.id));
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
        <Header title="Tasks" subtitle="Manage and organize your tasks" onToggleSidebar={() => setIsSidebarOpen(true)} >
          {isLoading && <div class="loader"></div>}
          {error && <AlertBar message={error.message} key={error.timestamp} />}
        </Header>
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
