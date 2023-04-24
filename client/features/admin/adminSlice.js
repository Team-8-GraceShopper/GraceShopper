import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async () => {
    const { data } = await axios.get("/api/products");
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async (product) => {
    const { data } = await axios.post("/api/products", product);
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, product }) => {
    const { data } = await axios.put(`/api/products/${id}`, product);
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id) => {
    await axios.delete(`/api/products/${id}`);
    return id;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default adminSlice.reducer;
