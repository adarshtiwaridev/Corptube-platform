import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch posts from backend
export const getUploadPost = createAsyncThunk("ticketraiseslice/getUploadPost", async () => {
  const res = await axios.get("/api/uploads/getuppladpost");
  return res.data.data; // since your handler returns { success, data }
});

const  ticketraiseslice = createSlice({
  name: "ticketraiseslice",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUploadPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUploadPost.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getUploadPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ticketraiseslice.reducer;
