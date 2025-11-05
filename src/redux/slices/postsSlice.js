import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch posts from backend
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get("/api/uploads/getpost");
  return res.data.data; // since your handler returns { success, data }
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
