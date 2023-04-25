import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarts, updateCart, removeFromCart } from "../cart/cartSlice";
import { fetchProducts } from "../product/productSlice";
import { NavLink } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.product.list);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([dispatch(fetchCarts()), dispatch(fetchProducts())])
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const calculateSubTotal = () => {
    let total = 0;
    Object.keys(carts).forEach((id) => {
      const product = products.find((product) => product.id === parseInt(id));
      if (product) {
        total += carts[id] * product.price;
      }
    });
    return total;
  };

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
              if (carts[id] > 0) {
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
                        <p className="cart-item-price">
                          Price: ${product.price}
                        </p>
                      </div>
                    </NavLink>
                    <div className="cart-item-quantity">
                      <input
                        type="number"
                        className="cart-item-quantity-input"
                        min={1}
                        value={carts[id]}
                        onChange={(e) =>
                          handleQuantityChange(
                            id,
                            parseInt(e.target.value),
                            null
                          )
                        }
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(id, carts[id], true)
                        }
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          handleQuantityChange(id, carts[id], false)
                        }
                      >
                        -
                      </button>
                      <button onClick={() => handleRemoveFromCart(id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="subtotal">
            <p>
              Subtotal: $
              {Number.isNaN(calculateSubTotal())
                ? 0
                : calculateSubTotal().toFixed(2)}
            </p>
          </div>
          <div className="checkout-form">
            <span>
              <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />

                <label htmlFor="street">Street:</label>
                <input type="text" id="street" name="street" />

                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" />

                <label htmlFor="state">State:</label>
                <input type="text" id="state" name="state" />

                <label htmlFor="country">Country:</label>
                <input type="text" id="country" name="country" />

                <label htmlFor="zipCode">Zip Code:</label>
                <input type="text" id="zipCode" name="zipCode" />
              </form>
            </span>
            <span>
              <form>
                <label htmlFor="creditCardNumber">Credit Card Number:</label>
                <input
                  type="text"
                  id="creditCardNumber"
                  name="creditCardNumber"
                />

                <label htmlFor="expirationDate">Expiration Date:</label>
                <input type="text" id="expirationDate" name="expirationDate" />
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" />
              </form>
            </span>
            <NavLink to="/cart/confirmation">
              <button>Buy Now</button>
            </NavLink>
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

export default Checkout;
