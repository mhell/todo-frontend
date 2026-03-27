
const TaskList = ({children}) => {
  return (
    <div className="card shadow-sm tasks-list mt-4">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Tasks</h5>
        <div className="btn-group">
          <button className="btn btn-outline-secondary btn-sm" title="Filter">
            <i className="bi bi-funnel"></i>
          </button>
          <button className="btn btn-outline-secondary btn-sm" title="Sort">
            <i className="bi bi-sort-down"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="list-group">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TaskList;