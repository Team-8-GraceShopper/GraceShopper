import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import AllProducts from "../features/product/Product";
import SingleProduct from "../features/singleProduct/singleProduct";
import AllUsers from "../features/user/User";
import AllCarts from "../features/cart/cart";
import AdminProduct from "../features/admin/admin";
import Checkout from "../features/checkout/checkout";
import Confirmation from "../features/confirmation/confirmation";
/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/cart" element={<AllCarts />} />
          <Route path="/admin" element={<AdminProduct />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/cart/confirmation" element={<Confirmation />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/cart" element={<AllCarts />} />
          <Route path="/admin" element={<AdminProduct />} />
          <Route path="/cart/checkout" element={<Checkout />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
