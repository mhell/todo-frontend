const TaskListItem = () => {
  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-md-flex gap-3 w-100 justify-content-between align-items-start">
        <div className="flex-grow-1">
          <div className="d-lg-flex gap-2 justify-content-between">
            <h6 className="mb-1">Complete Project Documentation</h6>
            <small className="text-muted">Created: 2025-08-07</small>
          </div>
          <p className="mb-1 text-muted small">Write comprehensive documentation for the new features</p>
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <small className="text-muted">
              <i className="bi bi-calendar-event"></i> Due: 2025-08-15
            </small>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              <span className="badge bg-info">
                <i className="bi bi-person"></i> Mehrdad Javan
              </span>
              <span className="badge bg-warning text-dark">pending</span>
            </div>
          </div>
        </div>
        <div className="btn-group mt-3 mt-md-0">
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
