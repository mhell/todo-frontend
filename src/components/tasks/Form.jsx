
const Form = () => {
  return (
    <div className="card shadow-sm task-form-section">
      <div className="card-body">
        <h2 className="card-title mb-4">Add New Task</h2>
        <form id="todoForm">
          <div className="mb-3">
            <label htmlFor="todoTitle" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="todoTitle" required />
          </div>
          <div className="mb-3">
            <label htmlFor="todoDescription" className="form-label">
              Description
            </label>
            <textarea className="form-control" id="todoDescription" rows="3"></textarea>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="todoDueDate" className="form-label">
                Due Date
              </label>
              <input type="datetime-local" className="form-control" id="todoDueDate" />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="todoPerson" className="form-label">
                Assign to Person
              </label>
              <select className="form-select" id="todoPerson">
                <option value="">-- Select Person (Optional) --</option>
                <option value="1">Mehrdad Javan</option>
                <option value="2">Simon Elbrink</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Attachments</label>
            <div className="input-group mb-3">
              <input type="file" className="form-control" id="todoAttachments" multiple />
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="file-list" id="attachmentPreview"></div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-plus-lg me-2"></i>
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;