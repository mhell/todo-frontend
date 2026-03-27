const TaskListItem = () => {
  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between align-items-start">
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between">
            <h6 className="mb-1">Complete Project Documentation</h6>
            <small className="text-muted ms-2">Created: 2025-08-07</small>
          </div>
          <p className="mb-1 text-muted small">Write comprehensive documentation for the new features</p>
          <div className="d-flex align-items-center flex-wrap">
            <small className="text-muted me-2">
              <i className="bi bi-calendar-event"></i> Due: 2025-08-15
            </small>
            <span className="badge bg-info me-2">
              <i className="bi bi-person"></i> Mehrdad Javan
            </span>
            <span className="badge bg-warning text-dark me-2">pending</span>
          </div>
        </div>
        <div className="btn-group ms-3">
          <button className="btn btn-outline-success btn-sm" title="Complete">
            <i className="bi bi-check-lg"></i>
          </button>
          <button className="btn btn-outline-primary btn-sm" title="Edit">
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-outline-danger btn-sm" title="Delete">
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskListItem;
