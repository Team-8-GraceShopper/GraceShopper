import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productSlice from "../features/product/productSlice";
import singleProductSlice from "../features/singleProduct/singleProductSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productSlice,
    singleProduct: singleProductSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
