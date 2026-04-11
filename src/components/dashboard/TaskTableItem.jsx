import React from 'react';
import { STATUS } from "../../utils/constants.js";

const TaskTableItem = ({task, index}) => {
  const status = task.completed ? STATUS.completed
                : !task.dueDate ? STATUS.pending
                : Date.parse(task.dueDate) < Date.now() ? STATUS.overdue
                : STATUS.inProgress;  

  return (
    <tr key={task.id}>
      <td>{index + 1}</td>
      <td>
        <div className="fw-medium">{task.title}</div>
      </td>
      <td>{task.team}</td>
      <td>
        <div className={status === "overdue" ? "text-danger" : ""}>{new Date(task.dueDate).toLocaleDateString()}</div>
      </td>
      <td>
        <span className={`badge ${status.class}`}>{status.message.at(0)?.toUpperCase() + status.message.slice(1)}</span>
      </td>
      <td>
        <div className="dropdown">
          <button className="btn btn-link btn-sm p-0" data-bs-toggle="dropdown">
            <i className="bi bi-three-dots-vertical"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item">Edit</button>
            </li>
            <li>
              <button className="dropdown-item">Mark Complete</button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item text-danger">Delete</button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default TaskTableItem;