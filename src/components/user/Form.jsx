import React from 'react';
import { useForm } from "react-hook-form";

const Form = ({header, onSave, editPerson}) => {
  const { register, reset, handleSubmit, getValues, formState: { errors, isDirty }} = useForm();

  const onSubmit = (data) => {
    onSave(editPerson ? { ...editTask, ...data } : data);
    reset();
  }

  return (
    <div className="card shadow-sm form-section">
    <div className="card-body">
      {header && <h2 className="card-title mb-4">{header}</h2>}
      <form id="personForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="personName" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="personName"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name needs to be at least 2 characters" },
              maxLength: { value: 100, message: "Name can be max 100 characters" },
            })}
          />
          <div className="invalid-feedback d-block">{errors.name?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="personUsername" className="form-label">
            Username
          </label>
          <input type="text" autoComplete="off" className="form-control" id="personUsername"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 4, message: "Username needs to be at least 4 characters" },
              maxLength: { value: 50, message: "Username can be max 50 characters" },
              pattern: {
                value: /^[a-zA-Z0-9._-]{4,50}$/,
                message: "Username can only contain letters, numbers, dots, underscores, and hyphens"
              },
            })}
          />
          <div className="invalid-feedback d-block">{errors.username?.message}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="personEmail" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="personEmail"
              {...register("email", {
                required: "Email is required",
                maxLength: { value: 150, message: "Email can be max 150 characters" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format"
                },
              })}
            />
            <div className="invalid-feedback d-block">{errors.email?.message}</div>
          </div>
          <div className="row">
            <div className="col-sm-6 mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" autoComplete="new-password" className="form-control" id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password needs to be at least 8 characters" },
                  maxLength: { value: 100, message: "Password can be max 100 characters" },
                })}
              />
              <div className="invalid-feedback d-block">{errors.password?.message}</div>
            </div>
            <div className="col-sm-6 mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
              <input type="password" className="form-control" id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Password confirmation is required",
                  validate: (value) => value === getValues("password") || "Passwords do not match",
                })}
              />
              <div className="invalid-feedback d-block">{errors.confirmPassword?.message}</div>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" className="btn btn-primary" disabled={!isDirty}>
              <i className="bi bi-plus-lg me-2"></i> Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;