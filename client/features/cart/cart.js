import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarts, updateCart, removeFromCart } from "./cartSlice";
import { fetchProducts } from "../product/productSlice";
import { NavLink } from "react-router-dom";

const AllCarts = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.product.list);
  const [loading, setLoading] = useState(true);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    Promise.all([dispatch(fetchCarts()), dispatch(fetchProducts())])
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    let total = 0;
    Object.keys(carts).forEach((id) => {
      const product = products.find((product) => product.id === parseInt(id));
      if (product) {
        total += carts[id] * product.price;
      }
    });
    setSubTotal(total);
  }, [carts, products]);

  const handleQuantityChange = (id, quantity, increase) => {
    let newQuantity = quantity;
    if (increase) {
      newQuantity += 1;
    } else {
      newQuantity -= 1;
    }
    if (newQuantity > 0) {
      dispatch(updateCart(id, newQuantity));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart-container">
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : carts && Object.keys(carts).length > 0 ? (
        <>
          <div className="cart-list">
            {Object.keys(carts).map((id) => {
              const product = products.find(
                (product) => product.id === parseInt(id)
              );
              return (
                <div className="cart-item" key={`All carts: ${id}`}>
                  <NavLink to={`/products/${id}`}>
                    <img
                      className="cart-item-image"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <div className="cart-item-details">
                      <p className="cart-item-name">{product.name}</p>
                      <p className="cart-item-price">Price: ${product.price}</p>
                    </div>
                  </NavLink>
                  <div className="cart-item-quantity">
                    <input
                      type="number"
                      className="cart-item-quantity-input"
                      min={1}
                      value={carts[id]}
                      onChange={(e) =>
                        handleQuantityChange(id, parseInt(e.target.value), null)
                      }
                    />
                    <button
                      onClick={() => handleQuantityChange(id, carts[id], true)}
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleQuantityChange(id, carts[id], false)}
                    >
                      -
                    </button>
                    <button onClick={() => handleRemoveFromCart(id)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="subtotal">
            <p>Subtotal: ${Number.isNaN(subTotal) ? 0 : subTotal.toFixed(2)}</p>
          </div>
        </>
      ) : (
        <div className="no-products">
          <p>Cart is Empty</p>
        </div>
      )}
    </div>
  );
};

export default AllCarts;
