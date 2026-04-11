import React from "react";

const Stats = () => {
  return (
    <>
      <div className="stat-card">
        <div className="stat-icon pending">
          <i className="bi bi-hourglass-split"></i>
        </div>
        <div className="stat-info">
          <h3>Pending</h3>
          <p className="stat-number">12</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon in-progress">
          <i className="bi bi-arrow-clockwise"></i>
        </div>
        <div className="stat-info">
          <h3>In Progress</h3>
          <p className="stat-number">5</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon completed">
          <i className="bi bi-check2-circle"></i>
        </div>
        <div className="stat-info">
          <h3>Completed</h3>
          <p className="stat-number">18</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon overdue">
          <i className="bi bi-hourglass-split"></i>
        </div>
        <div className="stat-info">
          <h3>Overdue</h3>
          <p className="stat-number">3</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon info">
          <i className="bi bi-people"></i>
        </div>
        <div className="stat-info">
          <h3>Users</h3>
          <p className="stat-number">1</p>
        </div>
      </div>
    </>
  );
};

export default Stats;
