import { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const STATUSES = {
  completed: { class: "text-bg-success", message: "completed" },
  pending: { class: "text-bg-warning", message: "pending" },
  overdue: { class: "text-bg-danger", message: "overdue" },
  inProgress: { class: "text-bg-primary", message: "in-progress" },
};

const TaskListItem = ({task, onComplete, onEdit, onDelete}) => {
  const { isAdmin } = useAuth();
  const ref = useRef(null); 
  const status = task.completed ? STATUSES.completed
                : !task.dueDate ? STATUSES.pending
                : Date.parse(task.dueDate) < Date.now() ? STATUSES.overdue
                : STATUSES.inProgress;

  useEffect(() => {
    ref.current.style.opacity = 1;
    return () => {
      //ref.current.style.opacity = 0;
  };
  }, [])

  return (
    <div className="list-group-item list-group-item-action" ref={ref}>
      <div className="d-md-flex gap-3 w-100 justify-content-between align-items-start">
        <div className="flex-grow-1">
          <div className="d-lg-flex gap-2 justify-content-between">
            <h6 className="mb-1">{task.title}</h6>
            <small className="text-muted">Created: {task.createdAt?.split("T")[0]}</small>
          </div>
          <p className="mb-1 text-muted small">{task.description}</p>
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <small className="text-muted">
              <i className="bi bi-calendar-event"></i> Due: {task.dueDate ? task.dueDate.split("T")[0] : <>n/a</>}
            </small>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              {task.personId &&
                <span className="badge bg-info">
                  <i className="bi bi-person"></i> {task.personId}
                </span>
              }
              <span className={`badge ${status.class}`}>
                {status.message}
              </span>
              {task.attachments?.length > 0 &&
                <span className={`badge bg-secondary`}>
                  <i className="bi bi-paperclip"></i> {task.attachments.length} attachment{task.attachments.length > 1 && "s"}
                </span>
              }
            </div>
          </div>
        </div>
        <div className="edit-buttons btn-group mt-3 mt-md-0">
          <button className={`btn btn-outline-success btn-sm ${task.completed && "text-bg-success"}`} title="Complete" 
            onClick={() => {
              task.completed = !task.completed;
              onComplete(task);
            }}>
            <i className="bi bi-check-lg"></i>
          </button>
          <button className="btn btn-outline-primary btn-sm" title="Edit" onClick={() => onEdit(task)}>
            <i className="bi bi-pencil"></i>
          </button>
          {isAdmin() &&
            <button className="btn btn-outline-danger btn-sm" title="Delete" onClick={() => onDelete(task)}>
              <i className="bi bi-trash"></i>
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default TaskListItem;
