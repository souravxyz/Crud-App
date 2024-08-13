import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./CreateProduct.css";
import { useProductCreateMutation } from "../hooks/react-query/query-hooks/productQuery.hooks";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner component

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const { mutate } = useProductCreateMutation();

  const onSubmit = (data) => {
    setLoading(true); // Set loading to true
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (img) {
      formData.append("image", img);
    }
    mutate(formData, {
      onSuccess: () => {
        setLoading(false); // Set loading to false
      },
      onError: () => {
        setLoading(false); // Set loading to false
      },
    });
  };

  return (
    <div className="create-product-wrapper">
      <div className="create-product-container">
        <Link className="btn btn-secondary" to="/productList">
          View Products List
        </Link>
        <h2 className="create-product-title">Create Product</h2>
        <form className="create-product-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              rows="4"
            />
            {errors.description && (
              <div className="invalid-feedback">
                {errors.description.message}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImg(e.target.files[0])}
              accept="image/*"
              className="form-control"
            />
            {img && (
              <img
                src={URL.createObjectURL(img)}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
