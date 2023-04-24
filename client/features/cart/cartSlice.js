import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCarts = createAsyncThunk("cart/fetch", async () => {
  const { data } = await axios.get("/api/cart");
  return data;
});

export const addToCart = (productId) => (dispatch) => {
  dispatch({
    type: "cart/productAdded",
    payload: {
      id: productId,
      quantity: 1,
    },
  });
};

export const updateCart = (productId, quantity) => (dispatch) => {
  dispatch({
    type: "cart/productUpdated",
    payload: {
      id: productId,
      quantity: quantity,
    },
  });
};

export const removeFromCart = (productId) => (dispatch) => {
  dispatch({
    type: "cart/productRemoved",
    payload: {
      id: productId,
    },
  });
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cartItems")) || {},
    status: "idle",
    error: null,
  },
  reducers: {
    productAdded(state, action) {
      const { id, quantity } = action.payload;
      state.items[id] = (state.items[id] || 0) + quantity;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    productUpdated(state, action) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    productRemoved(state, action) {
      const { id } = action.payload;
      delete state.items[id];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    });
  },
});

export const selectCarts = (state) => state.cart.list;

export default cartSlice.reducer;
