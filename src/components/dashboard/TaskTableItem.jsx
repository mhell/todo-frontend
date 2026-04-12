import React, { useEffect, useRef } from "react";
import getStatus from "../../utils/status.js";
import { usePersons } from "../../context/PersonContext";

const TaskTableItem = ({ task, index, onComplete, onEdit, onRemove }) => {
  const { getById: getPersonById } = usePersons();
  const status = getStatus(task);
  const ref = useRef(null);

   useEffect(() => {
      const node = ref.current;
      node.style.opacity = 1;
      return () => {
        //node.style.opacity = 0;
      };
    }, []);

  return (
    <tr key={task.id} ref={ref}>
      <td>{index + 1}</td>
      <td>
        <div className="fw-medium">{task.title}</div>
      </td>
      <td>{getPersonById(task.personId)?.name}</td>
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
              <button className="dropdown-item" onClick={() => onEdit(task)}>
                Edit
              </button>
            </li>
            <li>
              <button className="dropdown-item" 
              onClick={() => {
                task.completed = !task.completed;
                onComplete(task);
              }}>
                {!task.completed ? "Mark Completed" : "Mark Uncompleted"}
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item text-danger" onClick={() => onRemove(task)}>
                Delete
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default TaskTableItem;
