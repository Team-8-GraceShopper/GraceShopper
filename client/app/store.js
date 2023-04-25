import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productSlice from "../features/product/productSlice";
import singleProductSlice from "../features/singleProduct/singleProductSlice";
import userSlice from "../features/user/userSlice";
import cartSlice from "../features/cart/cartSlice";
import adminSlice from "../features/admin/adminSlice";
import checkoutSlice from "../features/checkout/checkoutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productSlice,
    singleProduct: singleProductSlice,
    user: userSlice,
    cart: cartSlice,
    admin: adminSlice,
    checkout: checkoutSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
