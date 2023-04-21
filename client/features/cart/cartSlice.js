import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCarts = createAsyncThunk("cart/fetch", async () => {
  const { data } = await axios.get("/api/cart");
  return data;
});

export const addToCart = (productId, quantity) => (dispatch) => {
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

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
    status: "idle",
    error: null,
  },
  reducers: {
    productAdded(state, action) {
      const { id, quantity } = action.payload;
      state.items[id] = (state.items[id] || 0) + quantity;
    },
    productUpdated(state, action) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
  },
});

export const selectCarts = (state) => state.cart.list;

export default cartSlice.reducer;
