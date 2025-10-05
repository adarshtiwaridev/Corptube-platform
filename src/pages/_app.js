import "./styles/globals.css";  // make sure this path is correct
import React from "react";
import { Toaster } from 'sonner'
// import { Provider } from "react-redux";
// import { SessionProvider } from "next-auth/react";

import authpage from './authpage';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // <SessionProvider session={session}>
    <>
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


    </>
    // </SessionProvider>
  );
}

export default MyApp;
