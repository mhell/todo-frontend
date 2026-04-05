import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useForm } from "react-hook-form";
import { Collapse } from "bootstrap";

const UserListItem = ({person, onSave, onRemove, isEditing, onToggleEdit}) => {
  const { register, reset, handleSubmit, formState: { errors, isDirty }} = useForm({ defaultValues: person });
  const { user } = useAuth();
  const ref = useRef(null); 
  const collapseRef = useRef(null);
  const [isEditClosing, setIsEditClosing] = useState(false);
  
  if (!isEditing && !isEditClosing) {
    setIsEditClosing(true);
  }

  useEffect(() => {
      const node = ref.current;
      node.style.opacity = 1;
      return () => {
        //node.style.opacity = 0;
    };
  }, [])

  const handleClosed = () => {
    setIsEditClosing(false);
    reset();
  }

  useEffect(() => {
    const collapseEl = collapseRef.current;
    if (isEditing) {
      Collapse.getOrCreateInstance(collapseRef.current)?.toggle();
    } else {
      Collapse.getInstance(collapseRef.current)?.toggle();
      collapseEl.addEventListener("hidden.bs.collapse", handleClosed);
    }
    return () => {
      collapseEl.removeEventListener("hidden.bs.collapse", handleClosed);
    };
  }, [isEditing]);

  useEffect(() => {
    reset(person);
  }, [person]);

  const onSubmit = (data) => {
    onSave({...person, ...(data.name  ? { name: data.name } : {}), ...(data.email  ? { email: data.email } : {})});
  } 

  return (
    <div className={`list-group-item ${!isEditing && "list-group-item-action"}`} ref={ref}>
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
          <button className="btn btn-outline-primary btn-sm" title="Edit" onClick={onToggleEdit}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-outline-danger btn-sm" title="Delete" disabled={user.email === person.email} onClick={() => onRemove(person)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <div className="collapse" ref={collapseRef}>
        {(isEditing || isEditClosing) && 
          <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="d-sm-flex gap-3 w-100">
              <div className="edit-input">
                <div className="invalid-feedback d-block">{errors.name?.message}&nbsp;</div>
                <div className="input-group">
                  <small className="input-group-text">Name</small>
                  <input type="text" className="form-control" placeholder={person.name}
                    {...register("name", {
                      minLength: { value: 2, message: "Name needs to be at least 2 characters" },
                      maxLength: { value: 100, message: "Name can be max 100 characters" },
                    })}
                  />
                </div>
              </div>
              <div className="edit-input">
                <div className="invalid-feedback d-block">{errors.email?.message}&nbsp;</div>
                <div className="input-group">
                  <small className="input-group-text">Email</small>
                  <input type="email" className="form-control" placeholder={person.email} 
                    {...register("email", {
                      maxLength: { value: 150, message: "Email can be max 150 characters" },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format"
                      },
                    })}
                  />
                </div>
              </div>
              <div className="d-flex gap-2 align-items-end">
                <button type="button" className="btn btn-secondary" onClick={onToggleEdit}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={!isDirty}>
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