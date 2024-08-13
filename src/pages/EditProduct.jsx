import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import {
  useGetProductById,
  useProductUpdateMutation,
} from "../hooks/react-query/query-hooks/productQuery.hooks";
import "./EditProduct.css"; 

const EditProduct = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetProductById(id);
  const { mutate } = useProductUpdateMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [img, setImg] = useState(null);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (img) {
      formData.append("image", img);
    }
    formData.append("id", id);
    mutate(formData);
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setValue("title", data.title);
      setValue("description", data.description);
    }
  }, [data, setValue, isLoading, isError]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading product details</p>;

  return (
    <>
      <div className="edit-product-wrapper">
        <div className="edit-product-container">
          <h2 className="edit-product-title">Edit Product</h2>
          <form className="edit-product-form" onSubmit={handleSubmit(onSubmit)}>
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
                  className="upload-img"
                />
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditProduct;
