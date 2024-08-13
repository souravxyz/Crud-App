import React, { useState } from "react";
import { image } from "../Api/Endpoints";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetProductQueries,
  useProductDeleteMutation,
} from "../hooks/react-query/query-hooks/productQuery.hooks";
import "./ProductList.css";

const ProductList = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data, isError, isLoading } = useGetProductQueries(page, perPage);
  const deleteMutation = useProductDeleteMutation();

  const handleDelete = (id) => {
    deleteMutation.mutate({ id });
  };

  const handleUpdate = (productId) => {
    navigate(`/editProduct/${productId}`);
  };

  if (isLoading) return <p className="loading">Loading...</p>;
  if (isError) return <p className="error">Error loading products</p>;

  const handleNextPage = () => {
    if (page < data.totalPages) {
      setPage((prevPage) => prevPage + 1);
    } else {
      toast.info("You're on the last page");
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    } else {
      toast.info("You're on the first page");
    }
  };

  return (
    <div className="product-list-wrapper">
      <div className="product-list-container">
        <Link className="btn btn-secondary mb-3" to="/createProduct">
          Create Product
        </Link>
        <h2 className="product-list-title">Product List</h2>
        <table className="table product-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.status}</td>
                <td>
                  {product.image ? (
                    <img
                      src={image(product.image)}
                      alt={product.title}
                      className="product-img"
                    />
                  ) : (
                    "No image available"
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdate(product._id)}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="btn btn-primary"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {data.totalPages}
          </span>
          <button
            className="btn btn-primary"
            onClick={handleNextPage}
            disabled={page === data.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
