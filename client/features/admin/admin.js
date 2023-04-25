import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAdminProducts,
  addAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "./adminSlice";

const AdminProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.admin.products);
  const isAdmin = useSelector((state) => state.auth.me);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchAdminProducts());
    }
  }, [dispatch, isAdmin]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
  };

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      dispatch(
        updateAdminProduct({ id: selectedProduct.id, product: editedProduct })
      );
    } else {
      dispatch(addAdminProduct(editedProduct));
    }
    setSelectedProduct(null);
    setEditedProduct({ name: "", description: "", price: 0 });
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      dispatch(deleteAdminProduct(selectedProduct.id));
      setSelectedProduct(null);
      setEditedProduct({ name: "", description: "", price: 0 });
    }
  };

  if (!isAdmin) {
    return <div>You don't have permission to access this page.</div>;
  }

  return (
    <div className="container">
      <h1>Product Management</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Products</h2>
          <ul className="list-group">
            {products.map((product) => (
              <li
                key={product.id}
                className={`list-group-item ${
                  selectedProduct && selectedProduct.id === product.id
                    ? "active"
                    : ""
                }`}
                onClick={() => handleSelectProduct(product)}
              >
                {product.name}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn btn-success mt-3"
            onClick={() => {
              setSelectedProduct(null);
              setEditedProduct({ name: "", description: "", price: 0 });
            }}
          >
            Add Product
          </button>
        </div>
        {selectedProduct && (
          <div className="col-md-6">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={editedProduct.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger ms-3"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-3"
                onClick={() => {
                  setSelectedProduct(null);
                  setEditedProduct({ name: "", description: "", price: 0 });
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProduct;
