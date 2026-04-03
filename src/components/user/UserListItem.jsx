import { useEffect, useRef } from "react";

const UserListItem = ({user}) => {
  const ref = useRef(null); 

  useEffect(() => {
      const node = ref.current;
      node.style.opacity = 1;
      return () => {
        //node.style.opacity = 0;
    };
  }, [])

  return (
    <div className="list-group-item list-group-item-action" ref={ref}>
      <div className="d-sm-flex gap-3 w-100 justify-content-between align-items-start">
        <div className="flex-grow-1">
          <h6 className="mb-1">{user.name}</h6>
          <small className="d-flex gap-2 align-items-center">
            <i className="bi bi-envelope"></i> Email: {user.email}
          </small>
        </div>
        <div className="edit-buttons btn-group mt-3 mt-md-0">
          <button className="btn btn-outline-primary btn-sm" title="Edit" onClick={() => onEdit(task)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-outline-danger btn-sm" title="Delete" onClick={() => onDelete(task)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;