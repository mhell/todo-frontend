
const TaskList = ({children, onSort, onFilter, isFiltered, isSorted}) => {
  return (
    <div className="card shadow-sm item-list mt-4">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Tasks</h5>
        <div className="btn-group">
        <button className={`btn btn-outline-secondary btn-sm ${isFiltered && 'text-bg-secondary'}`} title="Filter completed" onClick={onFilter}>
          <i className={`bi ${isFiltered ? "bi-funnel-fill" : "bi-funnel"}`}></i>
        </button>
        <button className={`btn btn-outline-secondary btn-sm ${isSorted && 'text-bg-secondary'}`} title={isSorted ? "Sort by creation date" : "Sort by due date"}onClick={onSort}>
          <i className={`bi ${isSorted ?  "bi-sort-up" : "bi-sort-down"}`}></i>
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