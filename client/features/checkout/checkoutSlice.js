import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCheckout = createAsyncThunk("checkout/fetch", async () => {
  const { data } = await axios.get("/api/cart/checkout");
  return data;
});

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    items: JSON.parse(localStorage.getItem("cartItems")) || {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCheckout.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    });
  },
});

export const selectCartItems = (state) => state.checkout.items;

export default checkoutSlice.reducer;
