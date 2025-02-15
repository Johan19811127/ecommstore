import "../styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import { useRouter } from "next/router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "@/context/CartContext";


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  let persistor = persistStore(store);
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>School Stores</title>
        <meta name="description" content="School Stores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <CartProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <ToastContainer />
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
