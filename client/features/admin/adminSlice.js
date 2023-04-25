import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchProducts",
  async () => {
    const { data } = await axios.get("/api/admin");
    return data;
  }
);

export const addAdminProduct = createAsyncThunk(
  "admin/addProduct",
  async (product) => {
    const { data } = await axios.post(`/api/admin/${id}`, product);
    return data;
  }
);

export const updateAdminProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, product }) => {
    const { data } = await axios.put(`/api/admin/${id}`, product);
    return data;
  }
);

export const deleteAdminProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id) => {
    await axios.delete(`/api/admin/${id}`);
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
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(addAdminProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default adminSlice.reducer;
