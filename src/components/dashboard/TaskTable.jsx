import React from 'react';
import { Link } from "react-router";

const TaskTable = ({ title, isOverdue, numOverdue, children }) => {

  return (
      <div className="tasks-section">
        <div className="section-header">
          <h2>
            <span className={isOverdue ? "text-danger" : ""}>{title}</span>
            {isOverdue && <span className="badge bg-danger ms-2">{numOverdue}</span>}
          </h2>
          <button className="btn btn-link text-decoration-none">
            <Link to="/dashboard/tasks">View All</Link>
            <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
  
        <div className="table-responsive overflow-visible">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col" style={{ width: "40px" }}>
                  #
                </th>
                <th scope="col">Task</th>
                <th scope="col">Assigned To</th>
                <th scope="col">Due Date</th>
                <th scope="col" style={{ width: "120px" }}>
                  Status
                </th>
                <th scope="col" style={{ width: "60px" }}></th>
              </tr>
            </thead>
            <tbody>
              {children}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default TaskTable;