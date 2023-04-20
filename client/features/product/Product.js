import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./productSlice";
import { NavLink } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.list);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchProducts())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="products-container">
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : products && products.length > 0 ? (
        products.map((product) => (
          <div className="product" key={`All products: ${product.id}`}>
            <NavLink to={`/products/${product.id}`}>
              <img src={product.imageUrl} alt={product.name} />
              <p>{product.name}</p>
            </NavLink>
          </div>
        ))
      ) : (
        <div className="no-products">
          <p>No products to display</p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
