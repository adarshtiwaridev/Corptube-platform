import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Like or Unlike Post
export const toggleLike = createAsyncThunk("posts/toggleLike", async ({userId, postId}) => {
  const res = await axios.post("/api/uploads/posts/[id]/like", {userId, postId });
  return { postId, ...res.data };
});

// ✅ Add Comment
export const addComment = createAsyncThunk("posts/addComment", async ({userId, postId, text }) => {
  const res = await axios.post("/api/uploads/posts/[id]/comment", { userId, postId, text });
  return { postId, comments: res.data.comments };
});

// ✅ Increment View Count
export const incrementView = createAsyncThunk("posts/incrementView", async ({userId, postId}) => {
  const res = await axios.post("/api/uploads/posts/[id]/view", { userId, postId });
  return { postId, totalViews: res.data.totalViews };
});

// ✅ Increment Save Count
export const incrementSave = createAsyncThunk("posts/incrementSave", async ({userId, postId}) => {
  const res = await axios.post("/api/uploads/posts/[id]/save", { userId, postId });
  return { postId, totalSaved: res.data.totalSaved };
});

const postInteractionSlice = createSlice({
  name: "postInteraction",
  initialState: {
    likes: {},
    comments: {},
    views: {},
    saves: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, totalLikes } = action.payload;
        state.likes[postId] = totalLikes;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.comments[postId] = comments;
      })
      .addCase(incrementView.fulfilled, (state, action) => {
        const { postId, totalViews } = action.payload;
        state.views[postId] = totalViews;
      })
      .addCase(incrementSave.fulfilled, (state, action) => {
        const { postId, totalSaved } = action.payload;
        state.saves[postId] = totalSaved;
      });
  },
});

export default postInteractionSlice.reducer;
