import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Collapse } from "bootstrap";

const UserListItem = ({person, onSave, onRemove}) => {
  const { user } = useAuth();
  const ref = useRef(null); 
  const collapseRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditClosing, setIsEditClosing] = useState(false);

  const isDirty = true;

  console.log("isEditing: ", isEditing)
  console.log("isEditClosing: ", isEditClosing)
  console.log("or", isEditing || isEditClosing);

  useEffect(() => {
      const node = ref.current;
      node.style.opacity = 1;
      return () => {
        //node.style.opacity = 0;
    };
  }, [])

  useEffect(() => {
    if (isEditing) {
      Collapse.getOrCreateInstance(collapseRef.current)?.toggle();
    } else {
      Collapse.getInstance(collapseRef.current)?.toggle();
      collapseRef.current.addEventListener("hidden.bs.collapse", () => setIsEditClosing(false));
    }
    return () => {
      collapseRef.current.removeEventListener("hidden.bs.collapse", () => setIsEditClosing(false));
    };
  }, [isEditing]);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setIsEditClosing(true);
    }
  }

  return (
    <div className="list-group-item list-group-item-action" ref={ref}>
      <div className="d-sm-flex gap-3 w-100 justify-content-between align-items-start">
        <div className="flex-grow-1 small">
          <div className="d-flex gap-2 align-items-center">
            <i className="bi bi-person-fill"></i> <h6 className="mb-0">{person.name}</h6>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <i className="bi bi-envelope"></i> {person.email}
          </div>
        </div>
        <div className="edit-buttons btn-group mt-3 mt-md-0">
          <button className="btn btn-outline-primary btn-sm" title="Edit" onClick={handleToggleEdit}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-outline-danger btn-sm" title="Delete" disabled={user.email === person.email} onClick={() => onRemove(person)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <div className="collapse" ref={collapseRef}>
        {(isEditing || isEditClosing) && 
          <form className="edit-form mt-3">
            <div className="d-sm-flex gap-3 w-100">
              <div className="flex-fill">
                <input type="text" className="form-control" placeholder={`Name: ${person.name}`} />
              </div>
              <div className="flex-fill">
                <input type="email" className="form-control" placeholder={`Email: ${person.email}`} />
              </div>
              <div className="d-flex gap-3 align-items-end">
                <button type="button" className="btn btn-secondary" onClick={handleToggleEdit}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={!isDirty} onClick={onSave(person)}>
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        }
      </div>
    </div>
  );
};

export default UserListItem;