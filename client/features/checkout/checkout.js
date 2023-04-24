import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckout, selectCartItems } from "./checkoutSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    dispatch(fetchCheckout());
  }, [dispatch]);

  useEffect(() => {
    let total = 0;
    Object.keys(cartItems).forEach((id) => {
      total += cartItems[id].quantity * cartItems[id].product.price;
    });
    setSubTotal(total);
  }, [cartItems]);

  return (
    <div>
      <h1>Checkout</h1>
      {Object.keys(cartItems).map((id) => (
        <div key={`Checkout: ${id}`}>
          <p>{cartItems[id].product.name}</p>
          <p>Quantity: {cartItems[id].quantity}</p>
          <p>Price: ${cartItems[id].product.price}</p>
        </div>
      ))}
      <p>Total Price: ${Number.isNaN(subTotal) ? 0 : subTotal.toFixed(2)}</p>
      {/* Display payment options and submit button */}
    </div>
  );
};

export default Checkout;
