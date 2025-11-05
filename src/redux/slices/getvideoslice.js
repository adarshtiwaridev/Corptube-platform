import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch posts from backend
export const getVideo = createAsyncThunk("getvideoslice/getVideo", async () => {
  const res = await axios.get("/api/uploads/getvideo");
  return res.data.data; // since your handler returns { success, data }
});

const   getvideoslice = createSlice({
  name: "getvideoslice",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getvideoslice.reducer;
