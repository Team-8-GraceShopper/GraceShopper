import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const { data } = await axios.get("/api/products");
  return data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
  },
});

export const selectProducts = (state) => state.product.list;

export default productSlice.reducer;
