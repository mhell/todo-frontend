import "./TaskForm.css";
import React, { useMemo, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTasks } from "../../context/TaskContext.jsx";
import { usePersons } from "../../context/PersonContext.jsx";
import { toLocalISOString } from "../../utils/converters.js";

const TaskForm = ({ header, onSave, onCancel, editTask }) => {
  const defaultValues = { ...editTask, ...(editTask?.dueDate ? { dueDate: editTask.dueDate.substring(0, 16) } : {}) };
  const { control, register, reset, setValue, handleSubmit, formState: { errors, isDirty }} = useForm({ defaultValues: defaultValues });
  const { error: saveError } = useTasks();
  const { persons } = usePersons();
  const attachments = useWatch({ control, name: "attachments", defaultValue: editTask?.attachments || [] });
  const attachmentNames = useMemo(() => Array.from(attachments).map((attachment) => attachment.fileName ?? attachment.name), [attachments]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isSaving && !saveError) {
      reset();
    }
  }, [isSaving, saveError]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    await onSave(editTask ? { ...editTask, ...data, numberOfAttachments: attachments.length } : data);
    setIsSaving(false);
  };

  const clearAttachments = () => {
    setValue("attachments", [], { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div className="task-form">
      <div className="card shadow-sm form-section">
        <div className="card-body">
          {header && <h2 className="card-title mb-4">{header}</h2>}
          <form id="todoForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="todoTitle" className="form-label">
                Title
              </label>
              <input  type="text" className="form-control" id="todoTitle"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 2, message: "Title needs needs to be at least 2 characters" },
                  maxLength: { value: 100, message: "Title can be max 100 characters" },
                  setValueAs: (value) => value?.trim()
                })}
              />
              <div className="invalid-feedback d-block">{errors.title?.message}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="todoDescription" className="form-label">
                Description
              </label>
              <textarea className="form-control" id="todoDescription"  rows="3"
                {...register("description", {
                  required: "Description is required",
                  maxLength: { value: 500, message: "Description can be max 500 characters" },
                  setValueAs: (value) => value?.trim()
                })}></textarea>
              <div className="invalid-feedback d-block">{errors.description?.message}</div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="todoDueDate" className="form-label">
                  Due Date
                </label>
                <input type="datetime-local" className="form-control" id="todoDueDate"
                  {...register("dueDate", {
                    validate: (value) => {
                      const minDate = toLocalISOString(new Date()).substring(0, 16);
                      const currentDueDate = Date.parse(editTask?.dueDate?.substring(0, 16));
                      if (!value) return true;
                      if (value > minDate) return true;
                      if (editTask && Date.parse(value) === currentDueDate) return true;
                      return "Due date cannot be set in the past";
                    },
                  })}
                />
                <div className="invalid-feedback d-block">{errors.dueDate?.message}</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="todoPerson" className="form-label">
                  Assign to Person
                </label>
                <select className="form-select" id="todoPerson" {...register("personId")}>
                  <option value="">-- Select Person (Optional) --</option>
                  {persons?.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="todoAttachments" className="form-label">
                Attachments
              </label>
              <div className="input-group mb-3">
                <input type="file" className="form-control" id="todoAttachments" multiple {...register("attachments", {
                    validate: (files) => {
                      if (files.length > 5) 
                        return "You can upload up to 5 files only";
                      if (Array.from(files).some((file) => file.size > 2*1024*1024 || file.size === 0))
                        return "Each file must be 2MB or smaller and not empty";
                      return true;
                    },
                  })}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={clearAttachments}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <div className="file-list" id="attachmentPreview">
                {attachmentNames.map((attachmentname, index) => (
                  <li key={index} className="list-group-item border-0 bi bi-file-earmark">
                    <span className="ms-1">{attachmentname}</span>
                  </li>
                ))}
              </div>
              <div className="invalid-feedback d-block">{errors.attachments?.message}</div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              {editTask && (
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                  Cancel
                </button>
              )}
              <button type="submit" className="btn btn-primary" disabled={!isDirty || isSaving}>
                {
                  isSaving ? <>Saving <i className="bi bi-arrow-repeat spin"></i></> :
                  editTask ? "Save Changes" : <> <i className="bi bi-plus-lg me-2"></i> Add Task</>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
