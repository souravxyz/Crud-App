import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { useUserSignUpMutation } from "../hooks/react-query/query-hooks/authQuery.hooks";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate } = useUserSignUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [img, setImg] = useState(null);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (img) {
      formData.append("profile_pic", img);
    }
    mutate(formData);
  };

  return (
    <div className="signup__wrapper">
      <div className="signup__container">
        <h2 className="signup__title">Create Your Account</h2>
        <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              {...register("first_name", {
                required: "First name is required",
              })}
              className={`form-control ${
                errors.first_name ? "is-invalid" : ""
              }`}
            />
            {errors.first_name && (
              <div className="invalid-feedback">
                {errors.first_name.message}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              {...register("last_name", { required: "Last name is required" })}
              className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
            />
            {errors.last_name && (
              <div className="invalid-feedback">{errors.last_name.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="profile_pic">Profile Picture</label>
            <input
              type="file"
              id="profile_pic"
              onChange={(e) => setImg(e.target.files[0])}
              accept="image/*"
              className="form-control"
            />
            {img && (
              <img
                src={URL.createObjectURL(img)}
                alt="Profile Preview"
                className="profile-img-preview"
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate("/signin")}
          >
            Already have an account? Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
