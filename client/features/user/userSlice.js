import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetch", async () => {
  const { data } = await axios.get("/api/users");
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectUsers = (state) => state.user.list;

export default userSlice.reducer;
