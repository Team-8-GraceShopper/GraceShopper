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
    imageUrl: "",
    inStock: 0,
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchAdminProducts());
    }
  }, [dispatch, isAdmin]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setShowAddForm(false);
  };

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAdminProduct(editedProduct));
    setSelectedProduct(null);
    setEditedProduct({
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      inStock: 0,
    });
    setShowAddForm(false);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      dispatch(deleteAdminProduct(selectedProduct.id));
      setSelectedProduct(null);
      setEditedProduct({
        name: "",
        description: "",
        price: 0,
        imageUrl: "",
        inStock: 0,
      });
      setShowAddForm(false);
    }
  };

  if (!isAdmin) {
    return <div>You don't have permission to access this page.</div>;
  }

  const addProductForm = (
    <div className="col-md-6">
      <h2>Add Product</h2>
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
            rows="3"
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
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={editedProduct.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="number"
            className="form-control"
            id="inStock"
            name="inStock"
            checked={editedProduct.inStock}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="inStock">
            In Stock
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );

  const editProductForm = (
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
            rows="3"
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
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={editedProduct.imageUrl}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="number"
            className="form-control"
            id="inStock"
            name="inStock"
            checked={editedProduct.inStock}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="inStock">
            In Stock
          </label>
        </div>
        <button
          type="submit"
          className="btn
.btn-primary"
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={handleDeleteProduct}
        >
          Delete
        </button>
      </form>
    </div>
  );
  return (
    <div className="row">
      <div className="col-md-6">
        <h2>Product List</h2>
        <ul className="list-group">
          {products.map((product) => (
            <li
              key={product.id}
              className={`list-group-item ${
                selectedProduct?.id === product.id ? "active" : ""
              }`}
              onClick={() => handleSelectProduct(product)}
            >
              {product.name}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={() => {
            setSelectedProduct(null);
            setEditedProduct({
              name: "",
              description: "",
              price: 0,
              imageUrl: "",
              inStock: 0,
            });
            setShowAddForm(!showAddForm);
          }}
        >
          {showAddForm ? "Close Form" : "Add Product"}
        </button>
        {showAddForm ? addProductForm : editProductForm}
      </div>
    </div>
  );
};

export default AdminProduct;

// const AdminProduct = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.admin.products);
//   const isAdmin = useSelector((state) => state.auth.me);

//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [editedProduct, setEditedProduct] = useState({
//     name: "",
//     description: "",
//     imageUrl:"",
//     price: 0,
//     inStock:0,
//   });
//   const [showAddForm, setShowAddForm] = useState(false);

//   useEffect(() => {
//     if (isAdmin) {
//       dispatch(fetchAdminProducts());
//     }
//   }, [dispatch, isAdmin]);

//   const handleSelectProduct = (product) => {
//     setSelectedProduct(product);
//     setEditedProduct({ ...product });
//   };

//   const handleChange = (e) => {
//     setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedProduct) {
//       dispatch(
//         updateAdminProduct({ id: selectedProduct.id, product: editedProduct })
//       );
//     } else {
//       dispatch(addAdminProduct(editedProduct));
//     }
//     setSelectedProduct(null);
//     setEditedProduct({ name: "",
//     description: "",
//     imageUrl:"",
//     price: 0,
//     inStock:0});
//   };

//   const handleDeleteProduct = () => {
//     if (selectedProduct) {
//       dispatch(deleteAdminProduct(selectedProduct.id));
//       setSelectedProduct(null);
//       setEditedProduct({ name: "",
//       description: "",
//       imageUrl:"",
//       price: 0,
//       inStock:0});
//     }
//   };

//   if (!isAdmin) {
//     return <div>You don't have permission to access this page.</div>;
//   }

//   return (
//     <div className="container">

//       <h1>Product Management</h1>
//       <div className="row">
//         <div className="col-md-6">
//           <h2>Products</h2>
//           <ul className="list-group">
//             {products.map((product) => (
//               <li
//                 key={product.id}
//                 className={`list-group-item ${
//                   selectedProduct && selectedProduct.id === product.id
//                     ? "active"
//                     : ""
//                 }`}
//                 onClick={() => handleSelectProduct(product)}
//               >
//                 {product.name}
//               </li>
//             ))}
//           </ul>
//           <button
//             type="button"
//             className="btn btn-success mt-3"
//             onClick={() => {
//               setSelectedProduct(null);
//               setEditedProduct({ name: "", description: "", price: 0 });
//             }}
//           >
//             Add Product
//           </button>
//         </div>
//         {selectedProduct && (
//           <div className="col-md-6">
//             <h2>Edit Product</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="name"
//                   name="name"
//                   value={editedProduct.name}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="description" className="form-label">
//                   Description
//                 </label>
//                 <textarea
//                   className="form-control"
//                   id="description"
//                   name="description"
//                   value={editedProduct.description}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="price" className="form-label">
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="price"
//                   name="price"
//                   value={editedProduct.price}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="inStock" className="form-label">
//                   Stock:
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="inStock"
//                   name="inStock"
//                   value={editedProduct.inStock}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="imageUrl" className="form-label">
//                   Image:
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="imageUrl"
//                   name="imageUrl"
//                   value={editedProduct.imageUrl}
//                   onChange={handleChange}
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Save
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-danger ms-3"
//                 onClick={handleDeleteProduct}
//               >
//                 Delete
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary ms-3"
//                 onClick={() => {
//                   setSelectedProduct(null);
//                   setEditedProduct({ name: "", description: "", price: 0 });
//                 }}
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
