import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import getvideoslice from "./slices/getvideoslice";
import ticketraiseslice from "./slices/ticketraiseslice";
import postInteractionSlice from "./slices/postInteractionSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    getvideoslice: getvideoslice,
    ticketraiseslice: ticketraiseslice,
    postInteraction: postInteractionSlice,
    auth: authSlice,
  },
});

export default store;
