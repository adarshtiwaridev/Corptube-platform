import "./styles/globals.css"; 
import React from "react";
import { Toaster } from 'sonner'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../redux/slices/postsSlice";
import { getVideo } from "../redux/slices/getvideoslice";
import { getUploadPost } from "../redux/slices/ticketraiseslice";
import { Provider } from "react-redux";
import store from "../redux/store";
import { fetchLoggedInUser } from "../redux/slices/authSlice";
import { toggleLike } from "../redux/slices/postInteractionSlice";
import { addComment } from "../redux/slices/postInteractionSlice";
import { incrementView } from "../redux/slices/postInteractionSlice";
import { incrementSave } from "../redux/slices/postInteractionSlice";
import { useSelector } from "react-redux";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
// Custom wrapper component to trigger fetch once app loads

const FetchPostsOnLoad = ({ children }) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const userId = user?.id;
    const postId = user?.postId;
    const text = user?.text;
    dispatch(toggleLike({userId, postId}));
    dispatch(addComment({userId, postId, text}));
    dispatch(incrementView({userId, postId}));
    dispatch(incrementSave({userId, postId}));
    dispatch(fetchLoggedInUser());
    dispatch(fetchPosts());
    dispatch(getVideo());
    dispatch(getUploadPost());
  }, [dispatch]);

  return children;
};

  return (
 <Provider store={store}>

    
 <FetchPostsOnLoad>

 <Component {...pageProps} />
  <Toaster
  position="top-center"
  richColors
  toastOptions={{
    classNames: {
      toast: "backdrop-blur-xl bg-black/60 border border-blue-500/50 text-blue-400 shadow-lg rounded-xl px-4 py-3",
      title: "text-lg font-semibold text-blue-400 drop-shadow-sm",
      description: "text-sm text-blue-300 opacity-90 drop-shadow-sm",
      icon: "text-blue-400",
      actionButton:
        "bg-blue-500 text-white font-medium rounded-md px-3 py-1 hover:bg-blue-600 transition",
      cancelButton:
        "bg-black/70 text-blue-400 border border-blue-500/40 font-medium rounded-md px-3 py-1 hover:bg-black/90 transition",
    },
  }}
  />

  </FetchPostsOnLoad>


    </Provider>
    
 
  );
}

export default MyApp;
