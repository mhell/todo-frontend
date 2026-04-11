import React, { useEffect, useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { usePersons } from "../../context/PersonContext"; 

const Stats = () => {
  const { tasks, getStats } = useTasks();
  const { persons } = usePersons();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      setStats(await getStats());
    }
    fetchStats();
  }, [tasks]);

  return (
    <>
      <div className="stat-card">
        <div className="stat-icon pending">
          <i className="bi bi-hourglass-split"></i>
        </div>
        <div className="stat-info">
          <h3>Pending</h3>
          <p className="stat-number">{stats?.pending}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon in-progress">
          <i className="bi bi-arrow-clockwise"></i>
        </div>
        <div className="stat-info">
          <h3>In Progress</h3>
          <p className="stat-number">{stats?.inProgress}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon completed">
          <i className="bi bi-check2-circle"></i>
        </div>
        <div className="stat-info">
          <h3>Completed</h3>
          <p className="stat-number">{stats?.completed}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon overdue">
          <i className="bi bi-hourglass-split"></i>
        </div>
        <div className="stat-info">
          <h3>Overdue</h3>
          <p className="stat-number">{stats?.overdue}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon info">
          <i className="bi bi-people"></i>
        </div>
        <div className="stat-info">
          <h3>Users</h3>
          <p className="stat-number">{persons?.length}</p>
        </div>
      </div>
    </>
  );
};

export default Stats;
